import { CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Etudiant } from "./etudiant.entity";
import { Group } from "./group.entity";

@Entity('membre_groupe')
export class GroupMember{
    @PrimaryGeneratedColumn()
    id:number;
    
    @ManyToOne(()=>Group,(g)=>g.membres)
    @JoinColumn({name:'group_id'})
    groupe:Group;
    

    @ManyToOne(()=>Etudiant,(g)=>g.membres)
    etudiant:Etudiant;

    @CreateDateColumn()
    created_at:Date
}