-- ============================================
-- DONNÉES INITIALES EDUPLATFORM
-- ============================================

-- =============================================
-- 1. COMPTE DIRECTEUR
-- =============================================
-- Mot de passe: Admin@123 (hash bcrypt à générer)
INSERT INTO compte (email, mot_de_passe, role, est_actif, premiere_connexion) 
VALUES ('directeur@eduplatform.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'DIRECTEUR', 1, 0);

INSERT INTO directeur (compte_id, nom, prenom, telephone)
VALUES (1, 'Administrateur', 'Principal', '+229 97 00 00 00');

-- =============================================
-- 2. COMPTES FORMATEURS
-- =============================================
-- Mot de passe: Formateur@123
INSERT INTO compte (email, mot_de_passe, role, est_actif, premiere_connexion) 
VALUES 
('martin.dubois@eduplatform.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'FORMATEUR', 1, 0),
('claire.rousseau@eduplatform.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'FORMATEUR', 1, 0),
('ahmed.benali@eduplatform.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'FORMATEUR', 1, 0);

INSERT INTO formateur (compte_id, nom, prenom, specialite, grade, departement, telephone)
VALUES 
(2, 'Dubois', 'Martin', 'Programmation, Algorithmique', 'Dr.', 'Informatique', '+229 97 11 11 11'),
(3, 'Rousseau', 'Claire', 'Base de Données, SQL', 'Prof.', 'Informatique', '+229 97 22 22 22'),
(4, 'Ben Ali', 'Ahmed', 'Réseaux, Sécurité', 'Dr.', 'Informatique', '+229 97 33 33 33');

-- =============================================
-- 3. PROMOTIONS
-- =============================================
INSERT INTO promotion (nom, code, annee_academique, niveau_etudes, date_debut, date_fin, capacite_max, description, est_active)
VALUES 
('L3 Informatique', 'L3-INFO-2024', 2024, 'L3', '2024-09-01', '2025-06-30', 50, 'Licence 3 Informatique - Promotion 2024-2025', 1),
('M1 Data Science', 'M1-DS-2024', 2024, 'M1', '2024-09-01', '2025-06-30', 35, 'Master 1 Data Science - Promotion 2024-2025', 1),
('M2 Cybersécurité', 'M2-CYBER-2024', 2024, 'M2', '2024-09-01', '2025-06-30', 30, 'Master 2 Cybersécurité - Promotion 2024-2025', 1);

-- =============================================
-- 4. COMPTES ÉTUDIANTS
-- =============================================
-- Mot de passe: Etudiant@123
INSERT INTO compte (email, mot_de_passe, role, est_actif, premiere_connexion) 
VALUES 
('pierre.durand@eduplatform.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'ETUDIANT', 1, 0),
('alice.martin@eduplatform.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'ETUDIANT', 1, 0),
('bob.bernard@eduplatform.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'ETUDIANT', 1, 0),
('sophie.laurent@eduplatform.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'ETUDIANT', 1, 0),
('lucas.petit@eduplatform.com', '$2b$10$abcdefghijklmnopqrstuvwxyz123456', 'ETUDIANT', 1, 0);

INSERT INTO etudiant (compte_id, nom, prenom, matricule, promotion_id, date_naissance, genre, telephone, annee_inscription)
VALUES 
(5, 'Durand', 'Pierre', '2024-INF-001', 1, '2003-05-15', 'M', '+229 90 11 11 11', 2024),
(6, 'Martin', 'Alice', '2024-INF-002', 1, '2003-08-22', 'F', '+229 90 22 22 22', 2024),
(7, 'Bernard', 'Bob', '2024-INF-003', 1, '2003-03-10', 'M', '+229 90 33 33 33', 2024),
(8, 'Laurent', 'Sophie', '2024-DS-001', 2, '2002-11-30', 'F', '+229 90 44 44 44', 2024),
(9, 'Petit', 'Lucas', '2024-DS-002', 2, '2002-07-18', 'M', '+229 90 55 55 55', 2024);

-- =============================================
-- 5. MATIÈRES
-- =============================================
INSERT INTO matiere (nom, code, description, nombre_credits)
VALUES 
('Programmation Avancée', 'INF301', 'Programmation orientée objet avancée, design patterns', 6),
('Base de Données', 'INF302', 'Conception et administration de bases de données relationnelles', 6),
('Réseaux et Sécurité', 'INF303', 'Architecture réseau et protocoles de sécurité', 5),
('Algorithmique', 'INF304', 'Algorithmes avancés et structures de données', 6),
('Machine Learning', 'DS201', 'Introduction au Machine Learning et Deep Learning', 7),
('Big Data', 'DS202', 'Technologies Big Data (Hadoop, Spark)', 6);

-- =============================================
-- 6. ESPACES PÉDAGOGIQUES
-- =============================================
INSERT INTO espace_pedagogique (nom, promotion_id, matiere_id, formateur_id, description, semestre, volume_horaire_total, date_debut, date_fin, est_actif, parametres)
VALUES 
('Programmation Avancée - L3 Informatique', 1, 1, 1, 'Cours de programmation orientée objet en Java et C++', 1, 48, '2024-09-01', '2025-01-31', 1, '{"voir_notes_camarades": true, "travaux_groupe": true, "forum": true}'),
('Base de Données - L3 Informatique', 1, 2, 2, 'Conception et gestion de bases de données relationnelles', 1, 42, '2024-09-01', '2025-01-31', 1, '{"voir_notes_camarades": false, "travaux_groupe": true, "forum": false}'),
('Réseaux et Sécurité - L3 Informatique', 1, 3, 3, 'Architecture réseau et sécurité informatique', 2, 40, '2025-02-01', '2025-06-30', 1, '{"voir_notes_camarades": false, "travaux_groupe": false, "forum": true}'),
('Machine Learning - M1 Data Science', 2, 5, 1, 'Introduction au Machine Learning et applications', 1, 60, '2024-09-01', '2025-01-31', 1, '{"voir_notes_camarades": true, "travaux_groupe": true, "forum": true}');

-- =============================================
-- 7. INSCRIPTIONS ÉTUDIANTS
-- =============================================
-- Étudiants L3 Informatique
INSERT INTO inscription_etudiant (espace_pedagogique_id, etudiant_id)
VALUES 
(1, 1), (1, 2), (1, 3),  -- Programmation Avancée
(2, 1), (2, 2), (2, 3),  -- Base de Données
(3, 1), (3, 2), (3, 3);  -- Réseaux

-- Étudiants M1 Data Science
INSERT INTO inscription_etudiant (espace_pedagogique_id, etudiant_id)
VALUES 
(4, 4), (4, 5);  -- Machine Learning

-- =============================================
-- 8. TRAVAUX
-- =============================================
INSERT INTO travail (espace_pedagogique_id, titre, consignes, type_travail, mode_groupe, date_debut, date_fin, createur_id, est_actif)
VALUES 
(1, 'Projet MVC en Java', 'Réalisez une application web complète utilisant le pattern MVC. L''application doit permettre la gestion d''une bibliothèque avec CRUD complet.', 'COLLECTIF', 'ETUDIANT', '2024-11-01 00:00:00', '2024-12-20 23:59:59', 1, 1),
(1, 'TP Algorithmes de tri', 'Implémentez et comparez différents algorithmes de tri (QuickSort, MergeSort, HeapSort). Analysez leur complexité.', 'INDIVIDUEL', 'NON_APPLICABLE', '2024-11-15 00:00:00', '2024-12-10 23:59:59', 1, 1),
(2, 'Requêtes SQL avancées', 'Créez une base de données complexe et réalisez 20 requêtes SQL avancées avec jointures, sous-requêtes et agrégations.', 'INDIVIDUEL', 'NON_APPLICABLE', '2024-11-01 00:00:00', '2024-12-15 23:59:59', 2, 1);

-- =============================================
-- 9. GROUPES (pour travail collectif)
-- =============================================
INSERT INTO groupe_etudiant (travail_id, nom_groupe, mode_formation, createur_id)
VALUES 
(1, 'Groupe Alpha', 'ETUDIANT', 1),
(1, 'Groupe Beta', 'ETUDIANT', 2);

-- Membres des groupes
INSERT INTO membre_groupe (groupe_id, etudiant_id)
VALUES 
(1, 1), (1, 2),  -- Groupe Alpha: Pierre et Alice
(2, 3);          -- Groupe Beta: Bob

-- =============================================
-- 10. AFFECTATIONS INDIVIDUELLES
-- =============================================
INSERT INTO affectation_individuelle (travail_id, etudiant_id, est_supprime)
VALUES 
(2, 1, 0), (2, 2, 0), (2, 3, 0),  -- TP Algorithmes
(3, 1, 0), (3, 2, 0), (3, 3, 0);  -- Requêtes SQL

-- =============================================
-- VÉRIFICATION
-- =============================================
SELECT '✅ Données initiales insérées avec succès !' as message;

SELECT 
    (SELECT COUNT(*) FROM compte) as nb_comptes,
    (SELECT COUNT(*) FROM etudiant) as nb_etudiants,
    (SELECT COUNT(*) FROM formateur) as nb_formateurs,
    (SELECT COUNT(*) FROM promotion) as nb_promotions,
    (SELECT COUNT(*) FROM matiere) as nb_matieres,
    (SELECT COUNT(*) FROM espace_pedagogique) as nb_espaces,
    (SELECT COUNT(*) FROM travail) as nb_travaux;