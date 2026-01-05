import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Etudiant } from '../../users/entities/etudiant.entity';
import { EspacePedagogique } from '../../spaces/entities/espace-pedagogique.entity';

@Entity('promotion')
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ unique: true }) // UNIQUE NOT NULL
  code: string;

  @Column({ name: 'annee_academique', type: 'integer' }) // CHECK (annee_academique > 2000)
  anneeAcademique: number;

  @Column({ name: 'niveau_etudes', nullable: true })
  niveauEtudes: string;

  @Column({ name: 'date_debut', type: 'date' })
  dateDebut: string;

  @Column({ name: 'date_fin', type: 'date' }) // CHECK (date_fin > date_debut)
  dateFin: string;

  @Column({ name: 'capacite_max', type: 'integer', nullable: true })
  capaciteMax: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'est_active', type: 'integer', default: 1 }) // CHECK(est_active IN (0, 1))
  estActive: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // --- RELATIONS ---

  // Une promotion contient plusieurs étudiants
  @OneToMany(() => Etudiant, (etudiant) => etudiant.promotion)
  etudiants: Etudiant[];

  // Une promotion est liée à plusieurs espaces pédagogiques (modules)
  @OneToMany(() => EspacePedagogique, (espace) => espace.promotion)
  espaces: EspacePedagogique[];
}