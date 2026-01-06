import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { Matiere } from './matiere.entity';
import { Formateur } from '../../users/entities/formateur.entity';
import { FormateurSecondaire } from './formateur-secondaire.entity';
import { InscriptionEtudiant } from './inscription-etudiant.entity';

@Entity('espace_pedagogique')
export class EspacePedagogique {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ nullable: true })
  promotion_id: number;

  @Column({ nullable: true })
  matiere_id: number;

  @Column({ nullable: true })
  formateur_id: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  semestre: number;

  @Column({ nullable: true })
  volume_horaire_total: number;

  @Column({ type: 'date', nullable: true })
  date_debut: Date;

  @Column({ type: 'date', nullable: true })
  date_fin: Date;

  @Column({ default: true })
  est_actif: boolean;

  @Column({ type: 'text', nullable: true })
  parametres: string;

  @CreateDateColumn({ type: 'datetime' })
  date_creation: Date;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @ManyToOne(() => Promotion, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;

  @ManyToOne(() => Matiere, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'matiere_id' })
  matiere: Matiere;

  @ManyToOne(() => Formateur, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'formateur_id' })
  formateur: Formateur;

  @OneToMany(() => FormateurSecondaire, fs => fs.espace)
  formateursSecondaires: FormateurSecondaire[];

  @OneToMany(() => InscriptionEtudiant, inscription => inscription.espace)
  inscriptions: InscriptionEtudiant[];
}