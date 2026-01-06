-- =====================================================
-- DONNEES DE TEST POUR EDUPLATFORM
-- =====================================================

-- Nettoyer les tables
DELETE FROM evaluation;
DELETE FROM inscription_etudiant;
DELETE FROM formateur_secondaire;
DELETE FROM espace_pedagogique;
DELETE FROM matiere;
DELETE FROM etudiant;
DELETE FROM formateur;
DELETE FROM directeur;
DELETE FROM technicien;
DELETE FROM promotion;
DELETE FROM compte;

-- =====================================================
-- COMPTES ET DIRECTEUR
-- =====================================================
INSERT INTO compte (id, email, mot_de_passe, role, est_actif, premiere_connexion) VALUES
(1, 'jean.dupont@academie.fr', '$2b$10$rKvVJZ8xH8lqBZJYqF.pDeYCxX7fZxE7xvNZhxKqYGHqV8H9K0wAK', 'DIRECTEUR', 1, 0);

INSERT INTO directeur (compte_id, nom, prenom, telephone) VALUES
(1, 'Dupont', 'Jean', '06 12 34 56 78');

-- =====================================================
-- FORMATEURS
-- =====================================================
INSERT INTO compte (id, email, mot_de_passe, role, est_actif, premiere_connexion) VALUES
(2, 'sophie.martin@academie.fr', '$2b$10$rKvVJZ8xH8lqBZJYqF.pDeYCxX7fZxE7xvNZhxKqYGHqV8H9K0wAK', 'FORMATEUR', 1, 0),
(3, 'julie.petit@academie.fr', '$2b$10$rKvVJZ8xH8lqBZJYqF.pDeYCxX7fZxE7xvNZhxKqYGHqV8H9K0wAK', 'FORMATEUR', 1, 0),
(4, 'jean.martin@academie.fr', '$2b$10$rKvVJZ8xH8lqBZJYqF.pDeYCxX7fZxE7xvNZhxKqYGHqV8H9K0wAK', 'FORMATEUR', 1, 0);

INSERT INTO formateur (compte_id, nom, prenom, specialite, grade, departement, bureau, telephone) VALUES
(2, 'Martin', 'Sophie', 'Informatique', 'Prof.', 'Sciences', 'Batiment A, Bureau 205', '06 23 45 67 89'),
(3, 'Petit', 'Julie', 'Mathematiques', 'Prof.', 'Sciences', 'Batiment B, Bureau 101', '06 34 56 78 90'),
(4, 'Martin', 'Jean', 'React Avance', 'Dr.', 'Informatique', 'Batiment C, Bureau 301', '06 45 67 89 01');

-- =====================================================
-- PROMOTIONS
-- =====================================================
INSERT INTO promotion (id, nom, code, annee_academique, niveau_etudes, date_debut, date_fin, capacite_max, description, est_active) VALUES
(1, 'Web Dev Full Stack 2024', 'WD2024', 2024, 'Licence 3', '2024-09-01', '2025-06-30', 45, 'Formation complete en developpement web full stack', 1),
(2, 'Data Science et IA 2024', 'DSIA2024', 2024, 'Master 1', '2024-09-01', '2025-06-30', 38, 'Formation en science des donnees et intelligence artificielle', 1),
(3, 'DevOps et Cloud 2024', 'DC2024', 2024, 'Master 2', '2024-09-01', '2025-06-30', 32, 'Formation DevOps et Cloud Computing', 1),
(4, 'Mobile Development 2024', 'MD2024', 2024, 'Licence 3', '2024-09-01', '2025-06-30', 28, 'Developpement mobile iOS et Android', 1);

-- =====================================================
-- ETUDIANTS
-- =====================================================
INSERT INTO compte (id, email, mot_de_passe, role, est_actif, premiere_connexion) VALUES
(5, 'marie.durand@academie.fr', '$2b$10$rKvVJZ8xH8lqBZJYqF.pDeYCxX7fZxE7xvNZhxKqYGHqV8H9K0wAK', 'ETUDIANT', 1, 0),
(6, 'pierre.bernard@academie.fr', '$2b$10$rKvVJZ8xH8lqBZJYqF.pDeYCxX7fZxE7xvNZhxKqYGHqV8H9K0wAK', 'ETUDIANT', 0, 1),
(7, 'laura.roux@academie.fr', '$2b$10$rKvVJZ8xH8lqBZJYqF.pDeYCxX7fZxE7xvNZhxKqYGHqV8H9K0wAK', 'ETUDIANT', 0, 1);

INSERT INTO etudiant (compte_id, nom, prenom, matricule, promotion_id, date_naissance, genre, telephone, annee_inscription) VALUES
(5, 'Durand', 'Marie', 'ETU2024001', 1, '2002-03-15', 'Feminin', '06 12 34 56 78', 2024),
(6, 'Bernard', 'Pierre', 'ETU2024002', 2, '2001-07-22', 'Masculin', '06 23 45 67 89', 2024),
(7, 'Roux', 'Laura', 'ETU2024003', 2, '2000-11-08', 'Feminin', '06 34 56 78 90', 2024);

-- =====================================================
-- MATIERES
-- =====================================================
INSERT INTO matiere (id, nom, code, description, nombre_credits) VALUES
(1, 'React Avance', 'REACT-ADV', 'Developpement d applications web avec React', 6),
(2, 'Machine Learning', 'ML-101', 'Introduction au Machine Learning', 6),
(3, 'Kubernetes', 'K8S-101', 'Orchestration de conteneurs avec Kubernetes', 5),
(4, 'Node.js', 'NODE-ADV', 'Backend avec Node.js et Express', 5),
(5, 'TypeScript', 'TS-ADV', 'TypeScript avance', 4);

-- =====================================================
-- ESPACES PEDAGOGIQUES
-- =====================================================
INSERT INTO espace_pedagogique (id, nom, promotion_id, matiere_id, formateur_id, description, semestre, volume_horaire_total, date_debut, date_fin, est_actif) VALUES
(1, 'React Avance', 1, 1, 4, 'Cours avance sur React avec hooks, context et Redux', 1, 60, '2024-09-01', '2024-12-31', 1),
(2, 'Machine Learning', 2, 2, 2, 'Introduction pratique au Machine Learning', 1, 80, '2024-09-01', '2024-12-31', 1),
(3, 'Kubernetes', 3, 3, 3, 'Deploiement et gestion avec Kubernetes', 2, 50, '2025-01-01', '2025-06-30', 1);

-- =====================================================
-- INSCRIPTIONS ETUDIANTS
-- =====================================================
INSERT INTO inscription_etudiant (espace_pedagogique_id, etudiant_id) VALUES
(1, 1),
(2, 2),
(2, 3);

-- =====================================================
-- FORMATEURS SECONDAIRES
-- =====================================================
INSERT INTO formateur_secondaire (espace_pedagogique_id, formateur_id) VALUES
(1, 2);

-- Message de confirmation
SELECT 'Donnees de test inserees avec succes' as message;