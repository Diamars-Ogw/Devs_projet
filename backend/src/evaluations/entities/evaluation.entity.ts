import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('evaluation')
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  livraison_id: number;

  @Column('real')
  note: number;

  @Column({ type: 'text', nullable: true })
  commentaire: string;

  @Column({ nullable: true })
  evaluateur_id: number;

  @CreateDateColumn({ type: 'datetime' })
  date_evaluation: Date;

  @Column({ type: 'datetime', nullable: true })
  date_modification: Date;

  @Column({ nullable: true })
  modificateur_id: number;

  @Column({ type: 'text', nullable: true })
  raison_modification: string;

  @CreateDateColumn({ type: 'datetime' })
  created_at: Date;

  @UpdateDateColumn({ type: 'datetime' })
  updated_at: Date;
}