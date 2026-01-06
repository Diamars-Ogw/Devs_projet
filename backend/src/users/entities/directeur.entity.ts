import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Compte } from './compte.entity';

@Entity('directeur')
export class Directeur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  compte_id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ nullable: true })
  telephone: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToOne(() => Compte, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'compte_id' })
  compte: Compte;
}