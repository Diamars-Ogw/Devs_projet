import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EspacePedagogique } from './espace-pedagogique.entity';
import { Etudiant } from '../../users/entities/etudiant.entity';

@Entity('inscription_etudiant')
export class InscriptionEtudiant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  espace_pedagogique_id: number;

  @Column()
  etudiant_id: number;

  @CreateDateColumn({ type: 'datetime' })
  date_inscription: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @ManyToOne(() => EspacePedagogique, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'espace_pedagogique_id' })
  espace: EspacePedagogique;

  @ManyToOne(() => Etudiant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'etudiant_id' })
  etudiant: Etudiant;
}