import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Livraison } from '../../submissions/entities/livraison.entity';
import { Formateur } from '../../users/entities/formateur.entity';
import { Directeur } from '../../users/entities/directeur.entity';

@Entity('evaluation')
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'livraison_id', nullable: true })
  livraisonId: number;

  @Column({ type: 'real' }) // CHECK (note >= 0 AND note <= 20)
  note: number;

  @Column({ type: 'text', nullable: true })
  commentaire: string;

  @Column({ name: 'evaluateur_id', nullable: true })
  evaluateurId: number;

  @CreateDateColumn({ name: 'date_evaluation' })
  dateEvaluation: Date;

  // Champs pour la modification (traçabilité Directeur)
  @Column({ name: 'date_modification', type: 'datetime', nullable: true })
  dateModification: Date;

  @Column({ name: 'modificateur_id', nullable: true })
  modificateurId: number;

  @Column({ name: 'raison_modification', type: 'text', nullable: true })
  raisonModification: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToOne(() => Livraison, (livraison) => livraison.evaluation)
  @JoinColumn({ name: 'livraison_id' })
  livraison: Livraison;

  @ManyToOne(() => Formateur)
  @JoinColumn({ name: 'evaluateur_id' })
  evaluateur: Formateur;

  @ManyToOne(() => Directeur)
  @JoinColumn({ name: 'modificateur_id' })
  modificateur: Directeur;
}