PRAGMA foreign_keys = ON;

-- =============================================
-- MODULE 1 : AUTHENTIFICATION
-- =============================================

-- Table compte (authentification)
CREATE TABLE IF NOT EXISTS compte (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    mot_de_passe TEXT NOT NULL,
    role TEXT NOT NULL CHECK(role IN ('DIRECTEUR', 'FORMATEUR', 'ETUDIANT', 'TECHNICIEN')),
    est_actif INTEGER DEFAULT 0 CHECK(est_actif IN (0, 1)),
    premiere_connexion INTEGER DEFAULT 1 CHECK(premiere_connexion IN (0, 1)),
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    derniere_connexion DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table directeur
CREATE TABLE IF NOT EXISTS directeur (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    compte_id INTEGER UNIQUE NOT NULL,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    telephone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (compte_id) REFERENCES compte(id) ON DELETE CASCADE
);

-- Table formateur
CREATE TABLE IF NOT EXISTS formateur (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    compte_id INTEGER UNIQUE NOT NULL,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    specialite TEXT,
    grade TEXT,
    departement TEXT,
    bureau TEXT,
    telephone TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (compte_id) REFERENCES compte(id) ON DELETE CASCADE
);

-- Table technicien
CREATE TABLE IF NOT EXISTS technicien (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    compte_id INTEGER UNIQUE NOT NULL,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    service TEXT NOT NULL,
    poste TEXT,
    telephone TEXT,
    permissions_speciales TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (compte_id) REFERENCES compte(id) ON DELETE CASCADE
);

-- =============================================
-- MODULE 2 : ORGANISATION
-- =============================================

-- Table promotion
CREATE TABLE IF NOT EXISTS promotion (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    annee_academique INTEGER NOT NULL,
    niveau_etudes TEXT,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    capacite_max INTEGER,
    description TEXT,
    est_active INTEGER DEFAULT 1 CHECK(est_active IN (0, 1)),
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CHECK (date_fin > date_debut),
    CHECK (annee_academique > 2000)
);

-- Table matiere
CREATE TABLE IF NOT EXISTS matiere (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    description TEXT,
    nombre_credits INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CHECK (nombre_credits >= 0)
);

-- Table etudiant
CREATE TABLE IF NOT EXISTS etudiant (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    compte_id INTEGER UNIQUE NOT NULL,
    nom TEXT NOT NULL,
    prenom TEXT NOT NULL,
    matricule TEXT UNIQUE NOT NULL,
    promotion_id INTEGER,
    date_naissance DATE,
    genre TEXT,
    telephone TEXT,
    date_inscription DATE DEFAULT CURRENT_DATE,
    annee_inscription INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (compte_id) REFERENCES compte(id) ON DELETE CASCADE,
    FOREIGN KEY (promotion_id) REFERENCES promotion(id) ON DELETE SET NULL
);

-- =============================================
-- MODULE 3 : PÃ‰DAGOGIE
-- =============================================

-- Table espace_pedagogique
CREATE TABLE IF NOT EXISTS espace_pedagogique (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL,
    promotion_id INTEGER,
    matiere_id INTEGER,
    formateur_id INTEGER,
    description TEXT,
    semestre INTEGER CHECK(semestre IN (1, 2)),
    volume_horaire_total INTEGER,
    date_debut DATE,
    date_fin DATE,
    est_actif INTEGER DEFAULT 1 CHECK(est_actif IN (0, 1)),
    parametres TEXT,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (promotion_id) REFERENCES promotion(id) ON DELETE SET NULL,
    FOREIGN KEY (matiere_id) REFERENCES matiere(id) ON DELETE SET NULL,
    FOREIGN KEY (formateur_id) REFERENCES formateur(id) ON DELETE SET NULL,
    UNIQUE(promotion_id, matiere_id)
);

-- Table formateur_secondaire
CREATE TABLE IF NOT EXISTS formateur_secondaire (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    espace_pedagogique_id INTEGER NOT NULL,
    formateur_id INTEGER NOT NULL,
    date_ajout DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (espace_pedagogique_id) REFERENCES espace_pedagogique(id) ON DELETE CASCADE,
    FOREIGN KEY (formateur_id) REFERENCES formateur(id) ON DELETE CASCADE,
    UNIQUE(espace_pedagogique_id, formateur_id)
);

-- Table inscription_etudiant
CREATE TABLE IF NOT EXISTS inscription_etudiant (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    espace_pedagogique_id INTEGER NOT NULL,
    etudiant_id INTEGER NOT NULL,
    date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (espace_pedagogique_id) REFERENCES espace_pedagogique(id) ON DELETE CASCADE,
    FOREIGN KEY (etudiant_id) REFERENCES etudiant(id) ON DELETE CASCADE,
    UNIQUE(espace_pedagogique_id, etudiant_id)
);

-- =============================================
-- MODULE 4 : TRAVAUX
-- =============================================

-- Table travail
CREATE TABLE IF NOT EXISTS travail (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    espace_pedagogique_id INTEGER,
    titre TEXT NOT NULL,
    consignes TEXT NOT NULL,
    type_travail TEXT NOT NULL CHECK(type_travail IN ('INDIVIDUEL', 'COLLECTIF')),
    mode_groupe TEXT NOT NULL DEFAULT 'NON_APPLICABLE' 
        CHECK(mode_groupe IN ('FORMATEUR', 'ETUDIANT', 'NON_APPLICABLE')),
    date_debut DATETIME NOT NULL,
    date_fin DATETIME NOT NULL,
    fichier_consigne_url TEXT,
    est_actif INTEGER DEFAULT 1 CHECK(est_actif IN (0, 1)),
    createur_id INTEGER,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (espace_pedagogique_id) REFERENCES espace_pedagogique(id) ON DELETE SET NULL,
    FOREIGN KEY (createur_id) REFERENCES formateur(id) ON DELETE SET NULL,
    CHECK (date_fin > date_debut),
    CHECK (
        (type_travail = 'INDIVIDUEL' AND mode_groupe = 'NON_APPLICABLE') OR
        (type_travail = 'COLLECTIF' AND mode_groupe != 'NON_APPLICABLE')
    )
);

-- Table affectation_individuelle
CREATE TABLE IF NOT EXISTS affectation_individuelle (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    travail_id INTEGER,
    etudiant_id INTEGER,
    date_affectation DATETIME DEFAULT CURRENT_TIMESTAMP,
    est_supprime INTEGER DEFAULT 0 CHECK(est_supprime IN (0, 1)),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (travail_id) REFERENCES travail(id) ON DELETE SET NULL,
    FOREIGN KEY (etudiant_id) REFERENCES etudiant(id) ON DELETE SET NULL
);

-- Table groupe_etudiant
CREATE TABLE IF NOT EXISTS groupe_etudiant (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    travail_id INTEGER,
    nom_groupe TEXT NOT NULL,
    mode_formation TEXT NOT NULL CHECK(mode_formation IN ('FORMATEUR', 'ETUDIANT')),
    createur_id INTEGER,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (travail_id) REFERENCES travail(id) ON DELETE SET NULL
);

-- Table membre_groupe
CREATE TABLE IF NOT EXISTS membre_groupe (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    groupe_id INTEGER NOT NULL,
    etudiant_id INTEGER NOT NULL,
    date_ajout DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (groupe_id) REFERENCES groupe_etudiant(id) ON DELETE CASCADE,
    FOREIGN KEY (etudiant_id) REFERENCES etudiant(id) ON DELETE CASCADE,
    UNIQUE(groupe_id, etudiant_id)
);

-- =============================================
-- MODULE 5 : Ã‰VALUATION
-- =============================================

-- Table livraison
CREATE TABLE IF NOT EXISTS livraison (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    affectation_id INTEGER,
    groupe_id INTEGER,
    contenu TEXT,
    fichier_url TEXT,
    date_livraison DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut TEXT DEFAULT 'EN_COURS' CHECK(statut IN ('EN_COURS', 'LIVRE', 'EN_RETARD')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (affectation_id) REFERENCES affectation_individuelle(id) ON DELETE SET NULL,
    FOREIGN KEY (groupe_id) REFERENCES groupe_etudiant(id) ON DELETE SET NULL,
    CHECK (contenu IS NOT NULL OR fichier_url IS NOT NULL)
);

-- Table evaluation
CREATE TABLE IF NOT EXISTS evaluation (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    livraison_id INTEGER,
    note REAL NOT NULL,
    commentaire TEXT,
    evaluateur_id INTEGER,
    date_evaluation DATETIME DEFAULT CURRENT_TIMESTAMP,
    date_modification DATETIME,
    modificateur_id INTEGER,
    raison_modification TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (livraison_id) REFERENCES livraison(id) ON DELETE SET NULL,
    FOREIGN KEY (evaluateur_id) REFERENCES formateur(id) ON DELETE SET NULL,
    FOREIGN KEY (modificateur_id) REFERENCES directeur(id) ON DELETE SET NULL,
    CHECK (note >= 0 AND note <= 20),
    CHECK (
        (date_modification IS NULL AND modificateur_id IS NULL AND raison_modification IS NULL) OR
        (date_modification IS NOT NULL AND modificateur_id IS NOT NULL AND raison_modification IS NOT NULL)
    )
);

-- =============================================
-- INDEX POUR PERFORMANCE
-- =============================================

-- Index compte
CREATE INDEX IF NOT EXISTS idx_compte_email ON compte(email);
CREATE INDEX IF NOT EXISTS idx_compte_role ON compte(role);
CREATE INDEX IF NOT EXISTS idx_compte_actif ON compte(est_actif);

-- Index utilisateurs
CREATE INDEX IF NOT EXISTS idx_directeur_compte ON directeur(compte_id);
CREATE INDEX IF NOT EXISTS idx_formateur_compte ON formateur(compte_id);
CREATE INDEX IF NOT EXISTS idx_etudiant_compte ON etudiant(compte_id);
CREATE INDEX IF NOT EXISTS idx_technicien_compte ON technicien(compte_id);
CREATE INDEX IF NOT EXISTS idx_etudiant_matricule ON etudiant(matricule);
CREATE INDEX IF NOT EXISTS idx_etudiant_promotion ON etudiant(promotion_id);

-- Index promotion et matiere
CREATE INDEX IF NOT EXISTS idx_promotion_code ON promotion(code);
CREATE INDEX IF NOT EXISTS idx_promotion_active ON promotion(est_active);
CREATE INDEX IF NOT EXISTS idx_matiere_code ON matiere(code);

-- Index espace_pedagogique
CREATE INDEX IF NOT EXISTS idx_espace_promotion ON espace_pedagogique(promotion_id);
CREATE INDEX IF NOT EXISTS idx_espace_matiere ON espace_pedagogique(matiere_id);
CREATE INDEX IF NOT EXISTS idx_espace_formateur ON espace_pedagogique(formateur_id);
CREATE INDEX IF NOT EXISTS idx_espace_actif ON espace_pedagogique(est_actif);

-- Index inscription
CREATE INDEX IF NOT EXISTS idx_inscription_espace ON inscription_etudiant(espace_pedagogique_id);
CREATE INDEX IF NOT EXISTS idx_inscription_etudiant ON inscription_etudiant(etudiant_id);

-- Index travail
CREATE INDEX IF NOT EXISTS idx_travail_espace ON travail(espace_pedagogique_id);
CREATE INDEX IF NOT EXISTS idx_travail_createur ON travail(createur_id);
CREATE INDEX IF NOT EXISTS idx_travail_actif ON travail(est_actif);

-- Index affectation
CREATE INDEX IF NOT EXISTS idx_affectation_travail ON affectation_individuelle(travail_id);
CREATE INDEX IF NOT EXISTS idx_affectation_etudiant ON affectation_individuelle(etudiant_id);
CREATE INDEX IF NOT EXISTS idx_affectation_supprime ON affectation_individuelle(est_supprime);

-- Index groupe
CREATE INDEX IF NOT EXISTS idx_groupe_travail ON groupe_etudiant(travail_id);
CREATE INDEX IF NOT EXISTS idx_membre_groupe ON membre_groupe(groupe_id);
CREATE INDEX IF NOT EXISTS idx_membre_etudiant ON membre_groupe(etudiant_id);

-- Index livraison
CREATE INDEX IF NOT EXISTS idx_livraison_affectation ON livraison(affectation_id);
CREATE INDEX IF NOT EXISTS idx_livraison_groupe ON livraison(groupe_id);
CREATE INDEX IF NOT EXISTS idx_livraison_statut ON livraison(statut);

-- Index evaluation
CREATE INDEX IF NOT EXISTS idx_evaluation_livraison ON evaluation(livraison_id);
CREATE INDEX IF NOT EXISTS idx_evaluation_evaluateur ON evaluation(evaluateur_id);
CREATE INDEX IF NOT EXISTS idx_evaluation_modificateur ON evaluation(modificateur_id);

-- =============================================
-- TRIGGERS AUTO-UPDATE
-- =============================================

-- Trigger pour compte
CREATE TRIGGER IF NOT EXISTS update_compte_updated_at 
AFTER UPDATE ON compte
FOR EACH ROW
BEGIN
    UPDATE compte SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Trigger pour directeur
CREATE TRIGGER IF NOT EXISTS update_directeur_updated_at 
AFTER UPDATE ON directeur
FOR EACH ROW
BEGIN
    UPDATE directeur SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Trigger pour formateur
CREATE TRIGGER IF NOT EXISTS update_formateur_updated_at 
AFTER UPDATE ON formateur
FOR EACH ROW
BEGIN
    UPDATE formateur SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Trigger pour etudiant
CREATE TRIGGER IF NOT EXISTS update_etudiant_updated_at 
AFTER UPDATE ON etudiant
FOR EACH ROW
BEGIN
    UPDATE etudiant SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Trigger pour technicien
CREATE TRIGGER IF NOT EXISTS update_technicien_updated_at 
AFTER UPDATE ON technicien
FOR EACH ROW
BEGIN
    UPDATE technicien SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Trigger pour promotion
CREATE TRIGGER IF NOT EXISTS update_promotion_updated_at 
AFTER UPDATE ON promotion
FOR EACH ROW
BEGIN
    UPDATE promotion SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Trigger pour matiere
CREATE TRIGGER IF NOT EXISTS update_matiere_updated_at 
AFTER UPDATE ON matiere
FOR EACH ROW
BEGIN
    UPDATE matiere SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Trigger pour espace_pedagogique
CREATE TRIGGER IF NOT EXISTS update_espace_updated_at 
AFTER UPDATE ON espace_pedagogique
FOR EACH ROW
BEGIN
    UPDATE espace_pedagogique SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Trigger pour travail
CREATE TRIGGER IF NOT EXISTS update_travail_updated_at 
AFTER UPDATE ON travail
FOR EACH ROW
BEGIN
    UPDATE travail SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Trigger pour livraison
CREATE TRIGGER IF NOT EXISTS update_livraison_updated_at 
AFTER UPDATE ON livraison
FOR EACH ROW
BEGIN
    UPDATE livraison SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Trigger pour evaluation
CREATE TRIGGER IF NOT EXISTS update_evaluation_updated_at 
AFTER UPDATE ON evaluation
FOR EACH ROW
BEGIN
    UPDATE evaluation SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- =============================================
-- VUES UTILES
-- =============================================

-- Vue : Tous les utilisateurs avec leurs rÃ´les
CREATE VIEW IF NOT EXISTS v_tous_utilisateurs AS
SELECT 
    c.id as compte_id,
    c.email,
    c.role,
    c.est_actif,
    COALESCE(d.nom, f.nom, e.nom, t.nom) as nom,
    COALESCE(d.prenom, f.prenom, e.prenom, t.prenom) as prenom,
    e.matricule,
    e.promotion_id
FROM compte c
LEFT JOIN directeur d ON c.id = d.compte_id
LEFT JOIN formateur f ON c.id = f.compte_id
LEFT JOIN etudiant e ON c.id = e.compte_id
LEFT JOIN technicien t ON c.id = t.compte_id;

-- Vue : Ã‰tudiants avec promotions
CREATE VIEW IF NOT EXISTS v_etudiants_complet AS
SELECT 
    e.id,
    e.compte_id,
    c.email,
    e.nom,
    e.prenom,
    e.matricule,
    e.telephone,
    p.id as promotion_id,
    p.nom as promotion_nom,
    p.code as promotion_code,
    c.est_actif,
    c.premiere_connexion
FROM etudiant e
JOIN compte c ON e.compte_id = c.id
LEFT JOIN promotion p ON e.promotion_id = p.id;

-- Vue : Formateurs
CREATE VIEW IF NOT EXISTS v_formateurs_complet AS
SELECT 
    f.id,
    f.compte_id,
    c.email,
    f.nom,
    f.prenom,
    f.specialite,
    f.grade,
    f.telephone,
    c.est_actif
FROM formateur f
JOIN compte c ON f.compte_id = c.id;

-- Vue : Espaces avec dÃ©tails
CREATE VIEW IF NOT EXISTS v_espaces_complet AS
SELECT 
    ep.id,
    ep.nom as espace_nom,
    m.nom as matiere_nom,
    m.code as matiere_code,
    p.nom as promotion_nom,
    p.code as promotion_code,
    f.nom || ' ' || f.prenom as formateur_nom,
    ep.semestre,
    ep.est_actif,
    (SELECT COUNT(*) FROM inscription_etudiant WHERE espace_pedagogique_id = ep.id) as nombre_inscrits
FROM espace_pedagogique ep
LEFT JOIN matiere m ON ep.matiere_id = m.id
LEFT JOIN promotion p ON ep.promotion_id = p.id
LEFT JOIN formateur f ON ep.formateur_id = f.id;

-- =============================================
-- MESSAGE FINAL
-- =============================================
