import { OneToOne, JoinColumn, Column, ManyToOne, PrimaryGeneratedColumn, Entity, OneToMany } from "typeorm";
import { Compte } from "./compte.entity";
import { Promotion } from "./promotion.entity";
import { Exclude } from "class-transformer";
import { InscriptionEtudiant } from "./inscription-etudiant.entity";
import { Affectation } from "./affectation.entity";
import { Group } from "./group.entity";
import { GroupMember } from "./group_member.entity";
@Entity('etudiant')
export class Etudiant {
   @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  matricule: string;

  @Column({ unique: true, nullable:true })
  telephone: string;
  

@ManyToOne(() => Promotion, (promo)=> promo.etudiant)
@JoinColumn({ name: 'promotion_id' })
promotion: Promotion;

@OneToOne(() => Compte,(c)=>c.etudiant, {onDelete:'CASCADE' })
@JoinColumn({ name: 'compte_id' })
compte: Compte;

@OneToMany(() => InscriptionEtudiant,(ins)=> ins.etudiant)
inscriptions: InscriptionEtudiant[];

@OneToMany(() => Affectation,(a)=> a.etudiant)
affectation: Affectation;

@OneToMany(()=>GroupMember,(g)=>g.etudiant)
membres:GroupMember[];
}
