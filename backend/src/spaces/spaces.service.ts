import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EspacePedagogique } from './entities/espace-pedagogique.entity';
import { InscriptionEtudiant } from './entities/inscription-etudiant.entity';

@Injectable()
export class SpacesService {
  constructor(
    @InjectRepository(EspacePedagogique)
    private readonly espaceRepo: Repository<EspacePedagogique>,
    @InjectRepository(InscriptionEtudiant)
    private readonly inscriptionRepo: Repository<InscriptionEtudiant>,
  ) {}

  async findByFormateur(formateurId: number) {
    return await this.espaceRepo.find({
      where: { formateurId, est_actif: 1 },
      relations: ['matiere', 'promotion'],
      order: { created_at: 'DESC' },
    });
  }

  // AJOUT : Règle l'erreur ts(2339) dans spaces.controller
  async getSpaceDetails(id: number) {
    const space = await this.espaceRepo.findOne({
      where: { id },
      relations: ['matiere', 'promotion', 'travaux'],
    });
    if (!space) throw new NotFoundException("Espace introuvable");
    return space;
  }

  // AJOUT : Règle l'erreur ts(2339) dans spaces.controller
  async findStudentsInSpace(espaceId: number) {
    return await this.inscriptionRepo.find({
      where: { espacePedagogiqueId: espaceId },
      relations: ['etudiant'],
    });
  }

  async countUniqueStudents(formateurId: number): Promise<number> {
    const res = await this.inscriptionRepo.createQueryBuilder('i')
      .innerJoin('i.espacePedagogique', 'e')
      .where('e.formateur_id = :formateurId', { formateurId })
      .select('COUNT(DISTINCT i.etudiant_id)', 'count')
      .getRawOne();
    return parseInt(res.count) || 0;
  }
}