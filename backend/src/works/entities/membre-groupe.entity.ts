import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { GroupeEtudiant } from './groupe-etudiant.entity';
import { Etudiant } from '../../users/entities/etudiant.entity';

@Entity('membre_groupe')
export class MembreGroupe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'groupe_id' })
  groupeId: number;

  @Column({ name: 'etudiant_id' })
  etudiantId: number;

  @CreateDateColumn({ name: 'date_ajout' })
  dateAjout: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // --- Relations ---

  @ManyToOne(() => GroupeEtudiant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupe_id' })
  groupe: GroupeEtudiant;

  @ManyToOne(() => Etudiant, (etudiant) => etudiant.groupes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'etudiant_id' })
  etudiant: Etudiant;
}