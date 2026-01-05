import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EspacePedagogique } from './espace-pedagogique.entity';

@Entity('matiere')
export class Matiere {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Correspond au code UNIQUE NOT NULL
  code: string;

  @Column() // Nom de la matière
  nom: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ 
    name: 'nombre_credits', 
    type: 'integer', 
    default: 0 
  }) // CHECK (nombre_credits >= 0)
  nombreCredits: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // --- Relations ---

  @OneToMany(() => EspacePedagogique, (espace) => espace.matiere)
  espaces: EspacePedagogique[];
}