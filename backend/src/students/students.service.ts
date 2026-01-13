import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Etudiant } from '../entities/etudiant.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Etudiant)
    private readonly etudiantRepo: Repository<Etudiant>,
  ) {}
  async getEtudiantByCompte(compteId: number): Promise<Etudiant> {
    const etudiant = await this.etudiantRepo.findOne({
      where: { compte: { id: compteId } },
      relations: ['compte','promotion'],
    });
    if (!etudiant) {
      throw new NotFoundException('Étudiant introuvable')
    };
    return etudiant;
  }
  async getProfile(compteId: number) {
    return this.getEtudiantByCompte(compteId);
  }

 /* async getDashboard(compteId: number) {
    const etudiant = await this.getEtudiantByCompte(compteId);

    return {
      nom: etudiant.nom,
      prenom: etudiant.prenom,
      matricule: etudiant.matricule,
      promotion: etudiant.promotion?.nom,
    };
  }
  */
}

