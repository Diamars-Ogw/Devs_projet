import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { EspacePedagogique } from './entities/espace-pedagogique.entity';
import { Matiere } from './entities/matiere.entity';
import { FormateurSecondaire } from './entities/formateur-secondaire.entity';
import { InscriptionEtudiant } from './entities/inscription-etudiant.entity';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { EnrollStudentsDto, EnrollPromotionDto } from './dto/enroll-students.dto';
import { Etudiant } from '../users/entities/etudiant.entity';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(EspacePedagogique)
    private espaceRepository: Repository<EspacePedagogique>,
    @InjectRepository(Matiere)
    private matiereRepository: Repository<Matiere>,
    @InjectRepository(FormateurSecondaire)
    private formateurSecRepository: Repository<FormateurSecondaire>,
    @InjectRepository(InscriptionEtudiant)
    private inscriptionRepository: Repository<InscriptionEtudiant>,
    @InjectRepository(Etudiant)
    private etudiantRepository: Repository<Etudiant>,
  ) {}

  async create(createSpaceDto: CreateSpaceDto) {
    const { formateurs_secondaires, ...espaceData } = createSpaceDto;

    // Vérifier unicité promotion + matière
    if (espaceData.promotion_id && espaceData.matiere_id) {
      const existing = await this.espaceRepository.findOne({
        where: {
          promotion_id: espaceData.promotion_id,
          matiere_id: espaceData.matiere_id,
        },
      });

      if (existing) {
        throw new BadRequestException(
          'Un espace pédagogique existe déjà pour cette combinaison promotion/matière',
        );
      }
    }

    const espace = this.espaceRepository.create(espaceData);
    const savedEspace = await this.espaceRepository.save(espace);

    // Ajouter les formateurs secondaires
    if (formateurs_secondaires && formateurs_secondaires.length > 0) {
      for (const formateurId of formateurs_secondaires) {
        const formateurSec = this.formateurSecRepository.create({
          espace_pedagogique_id: savedEspace.id,
          formateur_id: formateurId,
        });
        await this.formateurSecRepository.save(formateurSec);
      }
    }

    return this.findOne(savedEspace.id);
  }

  async findAll() {
    return this.espaceRepository
      .createQueryBuilder('espace')
      .leftJoinAndSelect('espace.promotion', 'promotion')
      .leftJoinAndSelect('espace.matiere', 'matiere')
      .leftJoinAndSelect('espace.formateur', 'formateur')
      .leftJoinAndSelect('espace.formateursSecondaires', 'formateursSecondaires')
      .leftJoinAndSelect('formateursSecondaires.formateur', 'formateurSec')
      .loadRelationCountAndMap('espace.nombreInscrits', 'espace.inscriptions')
      .orderBy('espace.created_at', 'DESC')
      .getMany();
  }

  async findOne(id: number) {
    const espace = await this.espaceRepository
      .createQueryBuilder('espace')
      .leftJoinAndSelect('espace.promotion', 'promotion')
      .leftJoinAndSelect('espace.matiere', 'matiere')
      .leftJoinAndSelect('espace.formateur', 'formateur')
      .leftJoinAndSelect('espace.formateursSecondaires', 'formateursSecondaires')
      .leftJoinAndSelect('formateursSecondaires.formateur', 'formateurSec')
      .leftJoinAndSelect('espace.inscriptions', 'inscriptions')
      .leftJoinAndSelect('inscriptions.etudiant', 'etudiant')
      .where('espace.id = :id', { id })
      .getOne();

    if (!espace) {
      throw new NotFoundException('Espace pédagogique non trouvé');
    }

    return espace;
  }

  async update(id: number, updateSpaceDto: UpdateSpaceDto) {
    const espace = await this.findOne(id);
    const { formateurs_secondaires, ...updateData } = updateSpaceDto;

    // Vérifier unicité si promotion ou matière modifiée
    if (
      (updateData.promotion_id && updateData.promotion_id !== espace.promotion_id) ||
      (updateData.matiere_id && updateData.matiere_id !== espace.matiere_id)
    ) {
      const existing = await this.espaceRepository.findOne({
        where: {
          promotion_id: updateData.promotion_id || espace.promotion_id,
          matiere_id: updateData.matiere_id || espace.matiere_id,
        },
      });

      if (existing && existing.id !== id) {
        throw new BadRequestException(
          'Un espace pédagogique existe déjà pour cette combinaison promotion/matière',
        );
      }
    }

    Object.assign(espace, updateData);
    await this.espaceRepository.save(espace);

    // Mettre à jour les formateurs secondaires si fournis
    if (formateurs_secondaires !== undefined) {
      // Supprimer les anciens
      await this.formateurSecRepository.delete({ espace_pedagogique_id: id });

      // Ajouter les nouveaux
      for (const formateurId of formateurs_secondaires) {
        const formateurSec = this.formateurSecRepository.create({
          espace_pedagogique_id: id,
          formateur_id: formateurId,
        });
        await this.formateurSecRepository.save(formateurSec);
      }
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const espace = await this.findOne(id);
    await this.espaceRepository.remove(espace);
    return { message: 'Espace pédagogique supprimé avec succès' };
  }

  async enrollStudents(id: number, enrollStudentsDto: EnrollStudentsDto) {
    const espace = await this.findOne(id);
    const enrolled = [];
    const alreadyEnrolled = [];

    for (const etudiantId of enrollStudentsDto.etudiant_ids) {
      // Vérifier si déjà inscrit
      const existing = await this.inscriptionRepository.findOne({
        where: {
          espace_pedagogique_id: id,
          etudiant_id: etudiantId,
        },
      });

      if (existing) {
        alreadyEnrolled.push(etudiantId);
        continue;
      }

      const inscription = this.inscriptionRepository.create({
        espace_pedagogique_id: id,
        etudiant_id: etudiantId,
      });

      await this.inscriptionRepository.save(inscription);
      enrolled.push(etudiantId);
    }

    return {
      message: 'Inscription terminée',
      enrolled: enrolled.length,
      alreadyEnrolled: alreadyEnrolled.length,
      details: {
        enrolled,
        alreadyEnrolled,
      },
    };
  }

  async enrollPromotion(id: number, enrollPromotionDto: EnrollPromotionDto) {
    const espace = await this.findOne(id);

    // Récupérer tous les étudiants de la promotion
    const etudiants = await this.etudiantRepository.find({
      where: { promotion_id: enrollPromotionDto.promotion_id },
    });

    if (etudiants.length === 0) {
      throw new BadRequestException('Aucun étudiant trouvé dans cette promotion');
    }

    const enrolled = [];
    const alreadyEnrolled = [];

    for (const etudiant of etudiants) {
      // Vérifier si déjà inscrit
      const existing = await this.inscriptionRepository.findOne({
        where: {
          espace_pedagogique_id: id,
          etudiant_id: etudiant.id,
        },
      });

      if (existing) {
        alreadyEnrolled.push(etudiant.id);
        continue;
      }

      const inscription = this.inscriptionRepository.create({
        espace_pedagogique_id: id,
        etudiant_id: etudiant.id,
      });

      await this.inscriptionRepository.save(inscription);
      enrolled.push(etudiant.id);
    }

    return {
      message: 'Inscription de la promotion terminée',
      enrolled: enrolled.length,
      alreadyEnrolled: alreadyEnrolled.length,
      total: etudiants.length,
    };
  }

  async unenrollStudent(espaceId: number, etudiantId: number) {
    const inscription = await this.inscriptionRepository.findOne({
      where: {
        espace_pedagogique_id: espaceId,
        etudiant_id: etudiantId,
      },
    });

    if (!inscription) {
      throw new NotFoundException('Inscription non trouvée');
    }

    await this.inscriptionRepository.remove(inscription);
    return { message: 'Étudiant désinscrit avec succès' };
  }

  async getEnrolledStudents(id: number) {
    const inscriptions = await this.inscriptionRepository.find({
      where: { espace_pedagogique_id: id },
      relations: ['etudiant', 'etudiant.compte', 'etudiant.promotion'],
    });

    return inscriptions.map(i => i.etudiant);
  }

  async getStatistics() {
    const total = await this.espaceRepository.count();
    const active = await this.espaceRepository.count({ where: { est_actif: true } });
    const inactive = await this.espaceRepository.count({ where: { est_actif: false } });

    return {
      total,
      active,
      inactive,
    };
  }

  // Gestion des matières
  async createMatiere(data: { nom: string; code: string; description?: string; nombre_credits?: number }) {
    const existing = await this.matiereRepository.findOne({ where: { code: data.code } });
    if (existing) {
      throw new BadRequestException('Ce code de matière existe déjà');
    }

    const matiere = this.matiereRepository.create(data);
    return this.matiereRepository.save(matiere);
  }

  async findAllMatieres() {
    return this.matiereRepository.find();
  }

  async findOneMatiere(id: number) {
    const matiere = await this.matiereRepository.findOne({ where: { id } });
    if (!matiere) {
      throw new NotFoundException('Matière non trouvée');
    }
    return matiere;
  }
}