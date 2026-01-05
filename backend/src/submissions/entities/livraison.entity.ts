import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AffectationIndividuelle } from '../../works/entities/affectation-individuelle.entity';
import { GroupeEtudiant } from '../../works/entities/groupe-etudiant.entity';
import { Evaluation } from '../../evaluations/entities/evaluation.entity';

@Entity('livraison')
export class Livraison {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'affectation_id', nullable: true })
  affectationId: number;

  @Column({ name: 'groupe_id', nullable: true })
  groupeId: number;

  @Column({ type: 'text', nullable: true })
  contenu: string;

  @Column({ name: 'fichier_url', nullable: true })
  fichierUrl: string;

  @Column({ 
    default: 'EN_COURS' 
  }) // CHECK(statut IN ('EN_COURS', 'LIVRE', 'EN_RETARD'))
  statut: string;

  @CreateDateColumn({ name: 'date_livraison' })
  dateLivraison: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => AffectationIndividuelle)
  @JoinColumn({ name: 'affectation_id' })
  affectation: AffectationIndividuelle;

  @ManyToOne(() => GroupeEtudiant)
  @JoinColumn({ name: 'groupe_id' })
  groupe: GroupeEtudiant;

  @OneToOne(() => Evaluation, (evaluation) => evaluation.livraison)
  evaluation: Evaluation;
    travail: any;
}