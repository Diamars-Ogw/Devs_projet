import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Travail } from "./travail.entity";
import { Etudiant } from "./etudiant.entity";
import { Livraison } from "./livraison.entity";

@Entity('affectation_individuelle')
export class Affectation{
    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(()=>Travail,(T)=>T.affectation)
    @JoinColumn({name:'travail_id'})
    travail:Travail;

    @ManyToOne(()=>Etudiant,(et)=>et.affectation)
    @JoinColumn({name:'etudiant_id'})
    etudiant:Etudiant;
    
    @OneToMany(()=>Livraison,(liv)=>liv.affection)
    livraison:Livraison[];
    
    @Column({default:0})
    est_supprime:number

    @CreateDateColumn()
    created_at:Date;
    
    @CreateDateColumn()
    date_affectation:Date;
}