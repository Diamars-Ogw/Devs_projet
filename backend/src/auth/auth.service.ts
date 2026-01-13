// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Compte } from 'src/entities/compte.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Compte)
    private compteRepo: Repository<Compte>,
    private jwtService: JwtService,
  ) {}


  async login(email: string, mot_de_passe: string) {
    const compte = await this.compteRepo.findOne({where: { email: email.trim().toLocaleLowerCase() } });
    if (!compte) {
      throw new UnauthorizedException('Email incorrect');
    }
    if (!compte.est_actif) {
      throw new UnauthorizedException('compte  inactif');
    }
    const passwordValid = await bcrypt.compare(mot_de_passe.trim(), compte.mot_de_passe.trim());
    if (!passwordValid) {
      throw new UnauthorizedException('Mot de passe incorrect');
    }
    compte.derniere_connexion=new Date()
    compte.premiere_connexion=false;
    await this.compteRepo.save(compte)
    
  const payload = {sub: compte.id, email: compte.email, role: compte.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
