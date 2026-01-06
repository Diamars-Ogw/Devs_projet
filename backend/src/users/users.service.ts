import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Compte, UserRole } from './entities/compte.entity';
import { Directeur } from './entities/directeur.entity';
import { Formateur } from './entities/formateur.entity';
import { Etudiant } from './entities/etudiant.entity';
import { Technicien } from './entities/technicien.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Compte)
    private compteRepository: Repository<Compte>,
    @InjectRepository(Directeur)
    private directeurRepository: Repository<Directeur>,
    @InjectRepository(Formateur)
    private formateurRepository: Repository<Formateur>,
    @InjectRepository(Etudiant)
    private etudiantRepository: Repository<Etudiant>,
    @InjectRepository(Technicien)
    private technicienRepository: Repository<Technicien>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, role, nom, prenom, telephone, ...restData } = createUserDto;

    // Vérifier si l'email existe déjà
    const existingCompte = await this.compteRepository.findOne({ where: { email } });
    if (existingCompte) {
      throw new BadRequestException('Cet email est déjà utilisé');
    }

    // Créer le compte
    const motDePasse = this.generateTemporaryPassword();
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    const compte = this.compteRepository.create({
      email,
      mot_de_passe: hashedPassword,
      role,
      est_actif: false,
      premiere_connexion: true,
    });

    const savedCompte = await this.compteRepository.save(compte);

    // Créer l'entité spécifique selon le rôle
    let specificEntity;

    switch (role) {
      case UserRole.DIRECTEUR:
        specificEntity = this.directeurRepository.create({
          compte_id: savedCompte.id,
          nom,
          prenom,
          telephone,
        });
        await this.directeurRepository.save(specificEntity);
        break;

      case UserRole.FORMATEUR:
        specificEntity = this.formateurRepository.create({
          compte_id: savedCompte.id,
          nom,
          prenom,
          telephone,
          specialite: restData.specialite,
          grade: restData.grade,
          departement: restData.departement,
          bureau: restData.bureau,
        });
        await this.formateurRepository.save(specificEntity);
        break;

      case UserRole.ETUDIANT:
        if (!restData.matricule) {
          throw new BadRequestException('Le matricule est requis pour un étudiant');
        }

        specificEntity = this.etudiantRepository.create({
          compte_id: savedCompte.id,
          nom,
          prenom,
          telephone,
          matricule: restData.matricule,
          promotion_id: restData.promotion_id,
          date_naissance: restData.date_naissance,
          genre: restData.genre,
          annee_inscription: restData.annee_inscription,
        });
        await this.etudiantRepository.save(specificEntity);
        break;

      case UserRole.TECHNICIEN:
        if (!restData.service) {
          throw new BadRequestException('Le service est requis pour un technicien');
        }

        specificEntity = this.technicienRepository.create({
          compte_id: savedCompte.id,
          nom,
          prenom,
          telephone,
          service: restData.service,
          poste: restData.poste,
          permissions_speciales: restData.permissions_speciales,
        });
        await this.technicienRepository.save(specificEntity);
        break;
    }

    // TODO: Envoyer email de bienvenue
    console.log(`Email de bienvenue à envoyer à ${email} avec mot de passe: ${motDePasse}`);

    return this.findOne(savedCompte.id);
  }

  async findAll(role?: UserRole) {
    const queryBuilder = this.compteRepository
      .createQueryBuilder('compte')
      .leftJoinAndSelect('compte.directeur', 'directeur')
      .leftJoinAndSelect('compte.formateur', 'formateur')
      .leftJoinAndSelect('compte.etudiant', 'etudiant')
      .leftJoinAndSelect('compte.technicien', 'technicien')
      .leftJoinAndSelect('etudiant.promotion', 'promotion');

    if (role) {
      queryBuilder.where('compte.role = :role', { role });
    }

    return queryBuilder.getMany();
  }

  async findOne(id: number) {
    const compte = await this.compteRepository
      .createQueryBuilder('compte')
      .leftJoinAndSelect('compte.directeur', 'directeur')
      .leftJoinAndSelect('compte.formateur', 'formateur')
      .leftJoinAndSelect('compte.etudiant', 'etudiant')
      .leftJoinAndSelect('compte.technicien', 'technicien')
      .leftJoinAndSelect('etudiant.promotion', 'promotion')
      .where('compte.id = :id', { id })
      .getOne();

    if (!compte) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    return compte;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const compte = await this.findOne(id);

    // Mettre à jour le compte
    if (updateUserDto.email) {
      compte.email = updateUserDto.email;
    }
    if (updateUserDto.est_actif !== undefined) {
      compte.est_actif = updateUserDto.est_actif;
    }

    await this.compteRepository.save(compte);

    // Mettre à jour l'entité spécifique
    const { nom, prenom, telephone, ...restData } = updateUserDto;

    switch (compte.role) {
      case UserRole.DIRECTEUR:
        if (compte.directeur) {
          await this.directeurRepository.update(compte.directeur.id, {
            nom,
            prenom,
            telephone,
          });
        }
        break;

      case UserRole.FORMATEUR:
        if (compte.formateur) {
          await this.formateurRepository.update(compte.formateur.id, {
            nom,
            prenom,
            telephone,
            specialite: restData.specialite,
            grade: restData.grade,
            departement: restData.departement,
            bureau: restData.bureau,
          });
        }
        break;

      case UserRole.ETUDIANT:
        if (compte.etudiant) {
          await this.etudiantRepository.update(compte.etudiant.id, {
            nom,
            prenom,
            telephone,
            promotion_id: restData.promotion_id,
            date_naissance: restData.date_naissance,
            genre: restData.genre,
          });
        }
        break;

      case UserRole.TECHNICIEN:
        if (compte.technicien) {
          await this.technicienRepository.update(compte.technicien.id, {
            nom,
            prenom,
            telephone,
            service: restData.service,
            poste: restData.poste,
            permissions_speciales: restData.permissions_speciales,
          });
        }
        break;
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    const compte = await this.findOne(id);
    await this.compteRepository.remove(compte);
    return { message: 'Utilisateur supprimé avec succès' };
  }

  async getInactiveAccounts() {
    return this.compteRepository.find({
      where: { est_actif: false },
      relations: ['directeur', 'formateur', 'etudiant', 'technicien'],
    });
  }

  async getStatistics() {
    const totalUsers = await this.compteRepository.count();
    const activeUsers = await this.compteRepository.count({ where: { est_actif: true } });
    const inactiveUsers = await this.compteRepository.count({ where: { est_actif: false } });
    
    const etudiants = await this.compteRepository.count({ where: { role: UserRole.ETUDIANT } });
    const formateurs = await this.compteRepository.count({ where: { role: UserRole.FORMATEUR } });
    const directeurs = await this.compteRepository.count({ where: { role: UserRole.DIRECTEUR } });
    const techniciens = await this.compteRepository.count({ where: { role: UserRole.TECHNICIEN } });

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      byRole: {
        etudiants,
        formateurs,
        directeurs,
        techniciens,
      },
    };
  }

  private generateTemporaryPassword(): string {
    return Math.random().toString(36).slice(-8).toUpperCase();
  }
}