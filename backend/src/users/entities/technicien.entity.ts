import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Compte } from './compte.entity';

@Entity('technicien')
export class Technicien {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  compte_id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  service: string;

  @Column({ nullable: true })
  poste: string;

  @Column({ nullable: true })
  telephone: string;

  @Column({ type: 'text', nullable: true })
  permissions_speciales: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;

  @OneToOne(() => Compte, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'compte_id' })
  compte: Compte;
}