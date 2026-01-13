import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Etudiant } from "./etudiant.entity";
import { Travail } from "./travail.entity";
import { Livraison } from "./livraison.entity";
import { Compte } from "./compte.entity";
import { Formateur } from "./formateur.entity";
import { Directeur } from "./directeur.entity";



@Entity('evaluation')
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal',{ precision:5,scale:2})
  note: number;

  @Column({type:'text', nullable: true })
  commentaire: string;

  @ManyToOne(() => Formateur,(Dir)=>Dir.note, {nullable:true})
  @JoinColumn({name:'evaluateur_id'})
  evaluateur: Formateur; //formateur

  @ManyToOne(() => Directeur,(Dir)=>Dir.note, { nullable: true })
  @JoinColumn({ name: 'modificateur_id' })
  modificateur: Directeur; //direceur

  @Column({nullable:true})
  raison_modification:string;

  @ManyToOne(() => Livraison,(l) => l.evaluations, {nullable:true})
  @JoinColumn({name:'livraison_id'})
  livraison: Livraison;

  @Column({type:'datetime',nullable:true})
  date_modification: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({type:'datetime',nullable:true})
  updated_at: Date;
}
