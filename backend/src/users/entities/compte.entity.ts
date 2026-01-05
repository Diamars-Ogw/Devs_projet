import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('compte')
export class Compte {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // UNIQUE NOT NULL
  email: string;

  @Column({ name: 'mot_de_passe', select: false }) // On cache le mot de passe par défaut pour la sécurité
  motDePasse: string;

  @Column({ 
    type: 'text' 
  }) // CHECK(role IN ('DIRECTEUR', 'FORMATEUR', 'ETUDIANT', 'TECHNICIEN'))
  role: string;

  @Column({ 
    name: 'est_actif', 
    type: 'integer', 
    default: 0 
  }) // CHECK(est_actif IN (0, 1))
  estActif: number;

  @Column({ 
    name: 'premiere_connexion', 
    type: 'integer', 
    default: 1 
  }) // CHECK(premiere_connexion IN (0, 1))
  premiereConnexion: number;

  @Column({ name: 'date_creation', type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  dateCreation: Date;

  @Column({ name: 'derniere_connexion', type: 'datetime', nullable: true })
  derniereConnexion: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}