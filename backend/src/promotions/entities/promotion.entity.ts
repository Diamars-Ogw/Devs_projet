import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Etudiant } from '../../users/entities/etudiant.entity';
import { EspacePedagogique } from '../../spaces/entities/espace-pedagogique.entity';

@Entity('promotion')
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ unique: true })
  code: string;

  @Column()
  annee_academique: number;

  @Column({ nullable: true })
  niveau_etudes: string;

  @Column({ type: 'date' })
  date_debut: Date;

  @Column({ type: 'date' })
  date_fin: Date;

  @Column({ nullable: true })
  capacite_max: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ default: true })
  est_active: boolean;

  @CreateDateColumn({ type: 'datetime' })
  date_creation: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToMany(() => Etudiant, etudiant => etudiant.promotion)
  etudiants: Etudiant[];

  @OneToMany(() => EspacePedagogique, espace => espace.promotion)
  espaces: EspacePedagogique[];
}