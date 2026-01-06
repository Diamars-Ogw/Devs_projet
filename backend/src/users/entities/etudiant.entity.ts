import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Compte } from './compte.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { InscriptionEtudiant } from '../../spaces/entities/inscription-etudiant.entity';

@Entity('etudiant')
export class Etudiant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  compte_id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  matricule: string;

  @Column({ nullable: true })
  promotion_id: number;

  @Column({ type: 'date', nullable: true })
  date_naissance: Date;

  @Column({ nullable: true })
  genre: string;

  @Column({ nullable: true })
  telephone: string;

  @Column({ type: 'date', default: () => 'CURRENT_DATE' })
  date_inscription: Date;

  @Column({ nullable: true })
  annee_inscription: number;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToOne(() => Compte, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'compte_id' })
  compte: Compte;

  @ManyToOne(() => Promotion, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;

  @OneToMany(() => InscriptionEtudiant, inscription => inscription.etudiant)
  inscriptions: InscriptionEtudiant[];
}