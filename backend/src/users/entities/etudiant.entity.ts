import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Compte } from './compte.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { InscriptionEtudiant } from '../../spaces/entities/inscription-etudiant.entity';
import { AffectationIndividuelle } from '../../works/entities/affectation-individuelle.entity';
import { MembreGroupe } from '../../works/entities/membre-groupe.entity';

@Entity('etudiant')
export class Etudiant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'compte_id', unique: true })
  compteId: number;

  @Column({ unique: true }) // Matricule unique pour chaque étudiant
  matricule: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ nullable: true })
  telephone: string;

  @Column({ name: 'promotion_id', nullable: true })
  promotionId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // --- Relations ---

  // Relation OneToOne avec Compte (L'étudiant est un type de compte)
  @OneToOne(() => Compte, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'compte_id' })
  compte: Compte;

  // Un étudiant appartient à une seule promotion (ex: "Master 1")
  @ManyToOne(() => Promotion, (promotion) => promotion.etudiants)
  @JoinColumn({ name: 'promotion_id' })
  promotion: Promotion;

  // Inscriptions aux différents espaces pédagogiques (modules)
  @OneToMany(() => InscriptionEtudiant, (inscription) => inscription.etudiant)
  inscriptions: InscriptionEtudiant[];

  // Affectations de travaux individuels
  @OneToMany(() => AffectationIndividuelle, (affectation) => affectation.etudiant)
  affectations: AffectationIndividuelle[];

  // Appartenance à des groupes pour les travaux collectifs
  @OneToMany(() => MembreGroupe, (membre) => membre.etudiant)
  groupes: MembreGroupe[];
}