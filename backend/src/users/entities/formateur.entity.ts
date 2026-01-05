import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Compte } from './compte.entity';
import { EspacePedagogique } from '../../spaces/entities/espace-pedagogique.entity';
import { Travail } from '../../works/entities/travail.entity';
import { Evaluation } from '../../evaluations/entities/evaluation.entity';

@Entity('formateur')
export class Formateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'compte_id', unique: true })
  compteId: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ nullable: true })
  specialite: string;

  @Column({ nullable: true })
  grade: string;

  @Column({ nullable: true })
  departement: string;

  @Column({ nullable: true })
  bureau: string;

  @Column({ nullable: true })
  telephone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToOne(() => Compte, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'compte_id' })
  compte: Compte;

  @OneToMany(() => EspacePedagogique, (esp) => esp.formateur)
  espaces: EspacePedagogique[];

  @OneToMany(() => Travail, (travail) => travail.createurId)
  travauxCrees: Travail[];

  @OneToMany(() => Evaluation, (evals) => evals.evaluateur)
  evaluationsFaites: Evaluation[];
}