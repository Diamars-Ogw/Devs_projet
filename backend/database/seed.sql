
-- SEED COMPLET POUR TEST API (SQLite)
-- Mot de passe pour tous les comptes : motdepasse123 (bcrypt)
PRAGMA foreign_keys = OFF;

DELETE FROM evaluation;
DELETE FROM livraison;
DELETE FROM membre_groupe;
DELETE FROM groupe_etudiant;
DELETE FROM affectation_individuelle;
DELETE FROM travail;
DELETE FROM inscription_etudiant;
DELETE FROM espace_pedagogique;
DELETE FROM etudiant;
DELETE FROM matiere;
DELETE FROM promotion;
DELETE FROM formateur;
DELETE FROM directeur;
DELETE FROM compte;

-- =========================
-- COMPTES
-- =========================
INSERT INTO compte (id, email, role, est_actif, premiere_connexion) VALUES
(1, 'directeur@edu.com', 'DIRECTEUR', 1, 0),
(2, 'formateur@edu.com', 'FORMATEUR', 1, 0),
(3, 'etudiant1@edu.com', 'ETUDIANT', 1, 0),
(4, 'etudiant2@edu.com', 'ETUDIANT', 1, 0),
(5, 'etudiant3@edu.com', 'ETUDIANT', 1, 0);

-- =========================
-- DIRECTEUR
-- =========================
INSERT INTO directeur (id, compte_id, nom, prenom, telephone) VALUES
(1, 1, 'ADMIN', 'ROOT', '97000000');

-- =========================
-- FORMATEUR
-- =========================
INSERT INTO formateur (id, compte_id, nom, prenom, specialite, telephone) VALUES
(1, 2, 'DOE', 'JOHN', 'Développement Web', '96000000');

-- =========================
-- PROMOTIONS
-- =========================
INSERT INTO promotion (id, nom, code, annee_academique, date_debut, date_fin) VALUES
(1, 'Licence Informatique', 'LIC-INFO-2024', 2024, '2024-10-01', '2025-07-31'),
(2, 'DUT Informatique', 'DUT-INFO-2024', 2024, '2024-10-01', '2025-07-31');

-- =========================
-- MATIERES
-- =========================
INSERT INTO matiere (id, nom, code, description, nombre_credits) VALUES
(1, 'Programmation Web', 'WEB101', 'HTML, CSS, JS', 6),
(2, 'Base de données', 'BD101', 'SQL et modélisation', 5);

-- =========================
-- ETUDIANTS
-- =========================
INSERT INTO etudiant (id, compte_id, nom, prenom, matricule, promotion_id, telephone) VALUES
(1, 3, 'KOUASSI', 'ALAIN', 'ETU001', 1, '94000001'),
(2, 4, 'TRAORE', 'MARIE', 'ETU002', 1, '94000002'),
(3, 5, 'YAO', 'PAUL', 'ETU003', 2, '94000003');

-- =========================
-- ESPACES PEDAGOGIQUES
-- =========================
INSERT INTO espace_pedagogique (id, promotion_id, matiere_id, formateur_id, nom, description) VALUES
(1, 1, 1, 1, 'Espace Web L1', 'Cours Web Licence'),
(2, 2, 2, 1, 'Espace BD DUT', 'Cours Base de données');

-- =========================
-- INSCRIPTIONS
-- =========================
INSERT INTO inscription_etudiant (id, espace_pedagogique_id, etudiant_id) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3);

-- =========================
-- TRAVAUX
-- =========================
INSERT INTO travail (id, espace_pedagogique_id, titre, consignes, type_travail, mode_groupe, date_debut, date_fin, createur_id) VALUES
(1, 1, 'TP HTML', 'Créer une page HTML', 'INDIVIDUEL', 'NON_APPLICABLE', '2024-11-01 08:00', '2024-11-10 23:59', 1),
(2, 1, 'Projet CSS', 'Mini site en groupe', 'COLLECTIF', 'ETUDIANT', '2024-11-05 08:00', '2024-11-30 23:59', 1),
(3, 2, 'TP SQL', 'Requêtes SQL', 'INDIVIDUEL', 'NON_APPLICABLE', '2024-11-03 08:00', '2024-11-15 23:59', 1);

-- =========================
-- AFFECTATIONS
-- =========================
INSERT INTO affectation_individuelle (id, travail_id, etudiant_id) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 3, 3);

-- =========================
-- GROUPES
-- =========================
INSERT INTO groupe_etudiant (id, travail_id, nom_groupe, mode_formation, createur_id) VALUES
(1, 2, 'Groupe Alpha', 'ETUDIANT', 1);

INSERT INTO membre_groupe (id, groupe_id, etudiant_id) VALUES
(1, 1, 1),
(2, 1, 2);

-- =========================
-- LIVRAISONS
-- =========================
INSERT INTO livraison (id, affectation_id, contenu, statut) VALUES
(1, 1, 'Devoir HTML livré', 'LIVRE'),
(2, 3, 'TP SQL terminé', 'LIVRE');

INSERT INTO livraison (id, groupe_id, contenu, statut) VALUES
(3, 1, 'Projet CSS final', 'LIVRE');

-- =========================
-- EVALUATIONS
-- =========================
INSERT INTO evaluation (id, livraison_id, note, commentaire, evaluateur_id) VALUES
(1, 1, 15.5, 'Bon travail', 1),
(2, 2, 14.0, 'Correct', 1),
(3, 3, 18.5, 'Excellent projet', 1);

PRAGMA foreign_keys = ON;
