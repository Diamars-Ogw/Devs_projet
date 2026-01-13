import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Etudiant } from "./etudiant.entity";
import { EspacePedagogique } from "./espace-pedagogique.entity";
import { Exclude } from "class-transformer";

@Entity('inscription_etudiant')
export class InscriptionEtudiant {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

 @ManyToOne(() => Etudiant,(et)=>et.inscriptions)
 @JoinColumn({ name: 'etudiant_id' })
  etudiant: Etudiant;

  @ManyToOne(() => EspacePedagogique,(esp)=>esp.inscriptions)
   @JoinColumn({ name: 'espace_pedagogique_id' })
  espace: EspacePedagogique;

  @Exclude()
  @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'})
  date_inscription: Date;
}
