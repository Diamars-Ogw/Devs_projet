import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Compte, UserRole } from '../users/entities/compte.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Compte)
    private compteRepository: Repository<Compte>,
  ) {}

  async login(email: string, password: string) {
    // Pour le moment, utilisons des données factices
    const fakeUsers = [
      {
        id: 1,
        email: 'jean.dupont@academie.fr',
        role: 'DIRECTEUR',
        nom: 'Dupont',
        prenom: 'Jean',
      },
      {
        id: 2,
        email: 'sophie.martin@academie.fr',
        role: 'FORMATEUR',
        nom: 'Martin',
        prenom: 'Sophie',
      },
      {
        id: 3,
        email: 'marie.durand@academie.fr',
        role: 'ETUDIANT',
        nom: 'Durand',
        prenom: 'Marie',
        matricule: 'ETU2024001',
      },
    ];

    const user = fakeUsers.find((u) => u.email === email);

    if (!user) {
      return null;
    }

    // Simuler une connexion réussie
    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        nom: user.nom,
        prenom: user.prenom,
      },
      token: 'fake-jwt-token-' + user.id,
    };
  }

  async validateUser(email: string, password: string) {
    const compte = await this.compteRepository.findOne({
      where: { email },
      relations: ['directeur', 'formateur', 'etudiant', 'technicien'],
    });

    if (!compte) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, compte.mot_de_passe);

    if (!isPasswordValid) {
      return null;
    }

    return compte;
  }
}