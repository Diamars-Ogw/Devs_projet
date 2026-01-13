import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Etudiant } from "./etudiant.entity";
import { Exclude } from "class-transformer";
import { Travail } from "./travail.entity";
import { Formateur } from "./formateur.entity";
import { Directeur } from "./directeur.entity";

  export enum RoleUtilisateur{
    DIRECTEUR='DIRECTEUR',
    FORMATEUR='FORMATEUR',
    ETUDIANT='ETUDIANT',
    TECHNICIEN='TECHNICIEN',
  }

@Entity('compte')
export class Compte {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'text', unique: true})
  email: string;
  
  @Exclude()
  @Column({ nullable:true}) // Ajout du password, nullable pour les comptes existants
  mot_de_passe: string;

  @Column()
  role: RoleUtilisateur;

  @Exclude()
  @Column({ default: 0 })
  est_actif: boolean;
  
  @Exclude()
  @Column({ default: true })
  premiere_connexion: boolean;

   @Exclude()
  @Column({ type: 'datetime',nullable:true })
  derniere_connexion: Date;

  @OneToOne(()=>Etudiant,(e)=>e.compte)
  etudiant:Etudiant;

  @OneToOne(()=>Formateur,(e)=>e.compte)
  formateur:Formateur;

  @OneToOne(()=>Directeur,(e)=>e.compte)
  directeur:Directeur;

}
