import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { EspacePedagogique } from './espace-pedagogique.entity';
import { Etudiant } from '../../users/entities/etudiant.entity';

@Entity('inscription_etudiant')
export class InscriptionEtudiant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'espace_pedagogique_id' })
  espacePedagogiqueId: number;

  @Column({ name: 'etudiant_id' })
  etudiantId: number;

  @CreateDateColumn({ name: 'date_inscription' })
  dateInscription: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // --- Relations ---

  @ManyToOne(() => EspacePedagogique, (espace) => espace.inscriptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'espace_pedagogique_id' })
  espacePedagogique: EspacePedagogique;

  @ManyToOne(() => Etudiant, (etudiant) => etudiant.inscriptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'etudiant_id' })
  etudiant: Etudiant;
}