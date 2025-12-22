import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('promotion') // Nom exact dans le .sql
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ unique: true })
  code: string;

  @Column({ name: 'annee_academique' })
  anneeAcademique: number;

  @Column({ name: 'niveau_etudes', nullable: true })
  niveauEtudes: string;

  @Column({ name: 'date_debut', type: 'date' })
  dateDebut: string;

  @Column({ name: 'date_fin', type: 'date' })
  dateFin: string;

  @Column({ name: 'capacite_max', nullable: true }) // Correspond au .sql
  capaciteMax: number;

  @Column({ type: 'text', nullable: true })
  description: string;
}
