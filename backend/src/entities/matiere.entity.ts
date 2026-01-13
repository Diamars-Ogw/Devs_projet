import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EspacePedagogique } from './espace-pedagogique.entity';
import { Exclude } from 'class-transformer';

@Entity('matiere')
export class Matiere {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Exclude()
  @Column({ unique: true })
  code: string;

  @Exclude()
  @Column({ nullable: true })
  description: string;

  @Column({ default: 0 })
  nombre_credits: number;

  @Exclude()
  @CreateDateColumn()
  created_at: Date;

  @Exclude()
  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(()=>EspacePedagogique,(esp)=>esp.matiere)
  espaces:EspacePedagogique;
}
