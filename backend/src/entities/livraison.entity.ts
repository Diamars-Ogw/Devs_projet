import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Etudiant } from "./etudiant.entity";
import { Affectation } from "./affectation.entity";
import { Group } from "./group.entity";
import { Note } from "./note.entity";

export enum StatutLivraison{
  EN_COURS='EN_COURS',
  LIVRE='LIVRE',
  EN_RETARD='EN_RETARD',
}

@Entity('livraison')
export class Livraison {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type:'text',nullable: true})
  contenu: string;

  @Column({name:'fichier_url',type:'text'})
  fichierUrl: string;

  @ManyToOne(()=>Affectation,(a)=>a.livraison)
  @JoinColumn({name:'affectation_id'})
  affection:Affectation;

  @ManyToOne(()=>Group,(g)=>g.livraison)
  @JoinColumn({name:'groupe_id'})
  groupe:Group;

  @OneToMany(()=>Note,(not)=>not.livraison)
  evaluations:Note[];

  @Column({type:'text', enum: StatutLivraison,default:StatutLivraison.EN_COURS})
  statut: StatutLivraison;
  
  @CreateDateColumn()
  created_at:Date;

  @UpdateDateColumn()
  updated_at:Date;
}
