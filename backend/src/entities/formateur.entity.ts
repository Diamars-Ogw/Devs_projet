import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Compte } from './compte.entity';
import { EspacePedagogique } from './espace-pedagogique.entity';
import { Exclude } from 'class-transformer';
import { Travail } from './travail.entity';
import { Note } from './note.entity';

@Entity('formateur')
export class Formateur {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Compte,(c)=>c.formateur, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'compte_id' })
  compte: Compte;

  @Column()
  nom: string;

  @Column()
  prenom: string;
  
  @OneToMany(()=>EspacePedagogique,(esp)=>esp.formateur)
  espaces:EspacePedagogique;

  @OneToMany(()=>Note,(not)=>not.evaluateur)
  note:Note[];

  @OneToMany(()=>Travail,(T)=>T.createur)
  travaux:Travail[];
}