import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Compte } from "./compte.entity";
import { Note } from "./note.entity";

@Entity('directeur')
export class Directeur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  // Relation vers la table compte pour avoir l'email et le rôle
   @OneToOne(() => Compte,(c)=>c.directeur, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'compte_id' })
  compte: Compte;

  @OneToMany(()=>Note,(note)=>note.modificateur)
    note:Note[];
}