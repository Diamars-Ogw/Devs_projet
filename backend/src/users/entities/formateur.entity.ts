import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Compte } from './compte.entity';
import { EspacePedagogique } from '../../spaces/entities/espace-pedagogique.entity';

@Entity('formateur')
export class Formateur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  compte_id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ nullable: true })
  specialite: string;

  @Column({ nullable: true })
  grade: string;

  @Column({ nullable: true })
  departement: string;

  @Column({ nullable: true })
  bureau: string;

  @Column({ nullable: true })
  telephone: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToOne(() => Compte, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'compte_id' })
  compte: Compte;

  @OneToMany(() => EspacePedagogique, espace => espace.formateur)
  espaces: EspacePedagogique[];
}