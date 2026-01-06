import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EspacePedagogique } from './espace-pedagogique.entity';
import { Formateur } from '../../users/entities/formateur.entity';

@Entity('formateur_secondaire')
export class FormateurSecondaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  espace_pedagogique_id: number;

  @Column()
  formateur_id: number;

  @CreateDateColumn({ type: 'datetime' })
  date_ajout: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @ManyToOne(() => EspacePedagogique, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'espace_pedagogique_id' })
  espace: EspacePedagogique;

  @ManyToOne(() => Formateur, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'formateur_id' })
  formateur: Formateur;
}