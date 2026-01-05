import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Travail } from './travail.entity';
import { Livraison } from '../../submissions/entities/livraison.entity';

@Entity('groupe_etudiant')
export class GroupeEtudiant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string; // Exemple: "Groupe A", "Équipe Alpha"

  @Column({ name: 'travail_id' })
  travailId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // --- Relations ---

  @ManyToOne(() => Travail)
  @JoinColumn({ name: 'travail_id' })
  travail: Travail;

  @OneToMany(() => Livraison, (livraison) => livraison.groupe)
  livraisons: Livraison[];

  // Note: La liste des membres du groupe se trouve dans l'entité membre-groupe.entity.ts
}