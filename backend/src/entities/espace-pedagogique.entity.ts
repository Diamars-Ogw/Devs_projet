import { ManyToOne, JoinColumn, Column, PrimaryGeneratedColumn, Entity, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Matiere } from "./matiere.entity";
import { Promotion } from "./promotion.entity";
import { Compte } from "./compte.entity";
import { Formateur } from "./formateur.entity";
import { InscriptionEtudiant } from "./inscription-etudiant.entity";
import { Exclude } from "class-transformer";
import { Travail } from "./travail.entity";

@Entity('espace_pedagogique')
export class EspacePedagogique {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({type:'text',nullable:true})
  description: string;

  @ManyToOne(() => Matiere, (m)=> m.espaces)
  @JoinColumn({ name: 'matiere_id' })
  matiere: Matiere[];

  /*@OneToMany(() => Travail, (travail) => travail.espace)
  travaux: Travail[]; */

  @ManyToOne(()=>Formateur,(f)=>f.espaces)
  @JoinColumn({name:'formateur_id'})
  formateur:Formateur[];

  @ManyToOne(() => Promotion, { nullable: true })
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;

  @OneToMany(()=>Travail,(T)=>T.espaces)
  travaux:Travail[];

  @Exclude()
  @Column()
  semestre: number;

  @Exclude()
  @Column({ default: 1 })
  est_actif: boolean;

  @OneToMany(()=>InscriptionEtudiant,(ins)=>ins.espace)
  inscriptions:InscriptionEtudiant[];
}

