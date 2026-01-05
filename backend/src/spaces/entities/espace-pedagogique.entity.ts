import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Formateur } from '../../users/entities/formateur.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { Matiere } from '../../spaces/entities/matiere.entity';
import { Travail } from '../../works/entities/travail.entity';
import { InscriptionEtudiant } from './inscription-etudiant.entity';

@Entity('espace_pedagogique')
export class EspacePedagogique {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'formateur_id' })
  formateurId: number;

  @Column({ name: 'promotion_id' })
  promotionId: number;

  @Column({ name: 'matiere_id' })
  matiereId: number;

  @Column({ default: 1 }) // CHECK(est_actif IN (0, 1))
  est_actif: number;

  @CreateDateColumn({ name: 'created_at' }) // Utilise snake_case en BDD
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  // --- Relations ---

  // Un espace appartient à un formateur
  @ManyToOne(() => Formateur)
  @JoinColumn({ name: 'formateur_id' })
  formateur: Formateur;

  // Un espace est lié à une promotion (ex: Master 1)
  @ManyToOne(() => Promotion, (promotion) => promotion.espaces)
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;

  // Un espace concerne une matière spécifique
  @ManyToOne(() => Matiere)
  @JoinColumn({ name: 'matiere_id' })
  matiere: Matiere;

  // Liste des travaux (devoirs) créés dans cet espace
  @OneToMany(() => Travail, (travail) => travail.espace)
  travaux: Travail[];

  // Liste des étudiants inscrits à ce module
  @OneToMany(() => InscriptionEtudiant, (inscription) => inscription.espacePedagogique)
  inscriptions: InscriptionEtudiant[];
}