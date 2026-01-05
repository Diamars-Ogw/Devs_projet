import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Travail } from './travail.entity';
import { Etudiant } from '../../users/entities/etudiant.entity';
import { Livraison } from '../../submissions/entities/livraison.entity';

@Entity('affectation_individuelle')
export class AffectationIndividuelle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'travail_id' })
  travailId: number;

  @Column({ name: 'etudiant_id' })
  etudiantId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // --- Relations ---

  @ManyToOne(() => Travail)
  @JoinColumn({ name: 'travail_id' })
  travail: Travail;

  @ManyToOne(() => Etudiant)
  @JoinColumn({ name: 'etudiant_id' })
  etudiant: Etudiant;

  @OneToMany(() => Livraison, (livraison) => livraison.affectation)
  livraisons: Livraison[];
}