import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Compte } from './compte.entity';
import { Evaluation } from '../../evaluations/entities/evaluation.entity';

@Entity('directeur')
export class Directeur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'compte_id', unique: true })
  compteId: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ nullable: true })
  telephone: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToOne(() => Compte, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'compte_id' })
  compte: Compte;

  // Relation pour la traçabilité des modifications de notes
  @OneToMany(() => Evaluation, (evaluation) => evaluation.modificateur)
  evaluationsModifiees: Evaluation[];
}