import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Compte } from '../users/entities/compte.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Compte)
    private compteRepository: Repository<Compte>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Trouver le compte
    const compte = await this.compteRepository.findOne({
      where: { email },
      relations: ['directeur', 'formateur', 'etudiant', 'technicien'],
    });

    if (!compte) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, compte.mot_de_passe);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Extraire les infos utilisateur
    const userEntity = compte.directeur || compte.formateur || compte.etudiant || compte.technicien;
    
    const user = {
      id: compte.id,
      email: compte.email,
      role: compte.role,
      nom: userEntity?.nom || '',
      prenom: userEntity?.prenom || '',
    };

    // Générer le token JWT
    const payload = { sub: compte.id, email: compte.email, role: compte.role };
    const access_token = this.jwtService.sign(payload);

    // Mettre à jour la dernière connexion
    compte.derniere_connexion = new Date();
    await this.compteRepository.save(compte);

    return {
      access_token,
      user,
    };
  }
}