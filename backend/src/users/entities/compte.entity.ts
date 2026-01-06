import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Directeur } from './directeur.entity';
import { Formateur } from './formateur.entity';
import { Etudiant } from './etudiant.entity';
import { Technicien } from './technicien.entity';

export enum UserRole {
  DIRECTEUR = 'DIRECTEUR',
  FORMATEUR = 'FORMATEUR',
  ETUDIANT = 'ETUDIANT',
  TECHNICIEN = 'TECHNICIEN',
}

@Entity('compte')
export class Compte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  mot_de_passe: string;

  @Column({
    type: 'text',
    enum: UserRole,
  })
  role: UserRole;

  @Column({ default: false })
  est_actif: boolean;

  @Column({ default: true })
  premiere_connexion: boolean;

  @Column({ type: 'datetime', nullable: true })
  derniere_connexion: Date;

  @CreateDateColumn({ type: 'datetime' })
  date_creation: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToOne(() => Directeur, directeur => directeur.compte)
  directeur?: Directeur;

  @OneToOne(() => Formateur, formateur => formateur.compte)
  formateur?: Formateur;

  @OneToOne(() => Etudiant, etudiant => etudiant.compte)
  etudiant?: Etudiant;

  @OneToOne(() => Technicien, technicien => technicien.compte)
  technicien?: Technicien;
}