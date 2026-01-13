import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Etudiant } from './etudiant.entity';
import { Exclude } from 'class-transformer';

@Entity('promotion')
export class Promotion {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Exclude()
  @Column({ unique: true })
  code: string;

  @Column()
  annee_academique: number;

  @Column({ nullable: true })
  niveau_etudes: string;

  @Exclude()  
  @Column({ type: 'date' })
  date_debut: string;

   @Exclude()
  @Column({ type: 'date' })
  date_fin: string;

   @Exclude()
  @Column({ nullable: true })
  capacite_max: number;

   @Exclude()
  @Column({ nullable: true })
  description: string;

   @Exclude()
  @Column({ default: true })
  est_active: boolean;

   @Exclude()
  @CreateDateColumn()
  created_at: Date;

   @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(()=>Etudiant,(et)=> et.promotion)
  etudiant:Etudiant[];
}
