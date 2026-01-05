import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EspacePedagogique } from '../../spaces/entities/espace-pedagogique.entity';
import { Formateur } from '../../users/entities/formateur.entity';

@Entity('travail')
export class Travail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'espace_pedagogique_id' })
  espaceId: number;

  @Column()
  titre: string;

  @Column('text')
  consignes: string;

  @Column() // 'INDIVIDUEL' ou 'COLLECTIF'
  type_travail: string;

  @Column({ default: 'NON_APPLICABLE' })
  mode_groupe: string;

  @Column({ type: 'datetime' })
  date_debut: Date;

  @Column({ type: 'datetime' })
  date_fin: Date;

  @Column({ default: 1 }) // <--- C'EST CETTE LIGNE QUI MANQUE DANS TON ERREUR
  est_actif: number;

  @Column({ name: 'createur_id' })
  createurId: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => EspacePedagogique)
  @JoinColumn({ name: 'espace_pedagogique_id' })
  espace: EspacePedagogique;

  @ManyToOne(() => Formateur)
  @JoinColumn({ name: 'createur_id' })
  createur: Formateur;
}