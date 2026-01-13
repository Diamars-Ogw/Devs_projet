import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { EspacePedagogique } from './espace-pedagogique.entity';
import { Formateur } from './formateur.entity';
import { Compte } from './compte.entity';
import { Affectation } from './affectation.entity';
import { Group } from './group.entity';

export enum TravailType {
  INDIVIDUEL = 'INDIVIDUEL',
  COLLECTIF = 'COLLECTIF',
}
export enum ModeGroupe {
  FORMATEUR = 'FORMATEUR',
  ETUDIANT = 'ETUDIANT',
  NON_APPLICABLE='NON_APPLICABLE'
}

@Entity('travail')
export class Travail {
  
  @PrimaryGeneratedColumn()
  id: number;

  /* ==============================
     Relations
  =============================== */
  

  @ManyToOne(() => EspacePedagogique, (e)=>e.travaux)
  @JoinColumn({name:'espace_pedagogique_id'})
  espaces: EspacePedagogique;

  @ManyToOne(() => Formateur,(f)=>f.travaux)
  @JoinColumn({name:'createur_id'})
  createur: Formateur;

  @OneToMany(() => Affectation,(a)=>a.travail)
  affectation: Affectation[];

   @OneToMany(() => Group,(g)=>g.travail)
  groupe: Group[];

  /* ===============================
     Colonnes
  =============================== */

  @Column()
  titre: string;

  @Column()
  consignes: string;

  @Column({
  type: 'text',
  enum: TravailType,
})
  type_travail: TravailType;
  
  @Column({
    type: 'text',
    enum: 'ModeGroupe',
  })
  mode_groupe: ModeGroupe;

  @Column('datetime')
  date_debut: Date;

  @Column('datetime')
  date_fin: Date;

  @Column()
  fichier_consigne_url: string;

  @Column({ default: true })
  est_actif: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  
}
