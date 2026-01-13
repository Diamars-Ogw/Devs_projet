import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ModeGroupe, Travail } from "./travail.entity";
import { Livraison } from "./livraison.entity";
import { GroupMember } from "./group_member.entity";

@Entity('groupe_etudiant')
export class Group{
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(()=>Travail,(T)=>T.groupe)
    @JoinColumn({name:'travail_id'})
    travail:Travail;

    @Column()
    nom_groupe:string;
    
    @Column({type:'text',enum:ModeGroupe})
    mode_formation:ModeGroupe;

    @Column()
    createur_id:String;

    @CreateDateColumn()
    created_at:Date;

    @OneToMany(()=>Livraison,(li)=>li.groupe)
    livraison:Livraison[];

    @OneToMany(() => GroupMember, (member) => member.groupe)
    membres: GroupMember[];
}