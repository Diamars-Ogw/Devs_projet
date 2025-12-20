# 🗄️ Base de Données EduPlatform

## 📋 Description

Base de données SQLite contenant toutes les tables nécessaires au fonctionnement de la plateforme.

## 📁 Fichiers

- `schema.sql` : Structure complète de la base (tables, index, triggers, vues)
- `seed.sql` : Données initiales pour le développement
- `eduplatform.db` : Base de données SQLite (gitignored)

## 🚀 Commandes

### Créer la base de données

```bash
npm run db:create
```

Cette commande :

- Supprime l'ancienne base si elle existe
- Crée une nouvelle base vide
- Exécute le script `schema.sql`
- Crée toutes les tables, index, triggers et vues

### Insérer les données initiales

```bash
npm run db:seed
```

Cette commande :

- Insère les comptes de test (Directeur, Formateurs, Étudiants)
- Crée des promotions
- Crée des matières
- Crée des espaces pédagogiques
- Inscrit des étudiants
- Crée des travaux de test

### Réinitialiser complètement

```bash
npm run db:reset
```

Équivalent à : `db:create` + `db:seed`

## 🔐 Comptes de Test

### Directeur

- **Email** : `directeur@eduplatform.com`
- **Mot de passe** : `Admin@123`

### Formateurs

- **Email** : `martin.dubois@eduplatform.com`
- **Mot de passe** : `Formateur@123`

### Étudiants

- **Email** : `pierre.durand@eduplatform.com`
- **Mot de passe** : `Etudiant@123`

## 📊 Structure des Tables

### Module Authentification

- `compte` : Comptes utilisateurs
- `directeur` : Infos directeurs
- `formateur` : Infos formateurs
- `etudiant` : Infos étudiants
- `technicien` : Infos techniciens

### Module Organisation

- `promotion` : Promotions (L3, M1, M2)
- `matiere` : Matières enseignées

### Module Pédagogie

- `espace_pedagogique` : Espaces de cours
- `formateur_secondaire` : Formateurs secondaires
- `inscription_etudiant` : Inscriptions étudiants

### Module Travaux

- `travail` : Travaux assignés
- `affectation_individuelle` : Assignations individuelles
- `groupe_etudiant` : Groupes d'étudiants
- `membre_groupe` : Membres des groupes

### Module Évaluation

- `livraison` : Soumissions de travaux
- `evaluation` : Notes et commentaires

## 🔍 Vues Disponibles

- `v_tous_utilisateurs` : Tous les utilisateurs avec leurs rôles
- `v_etudiants_complet` : Étudiants avec leurs promotions
- `v_formateurs_complet` : Formateurs avec leurs infos
- `v_espaces_complet` : Espaces avec détails complets

## 🛠️ Maintenance

### Visualiser la base

```bash
# Installer sqlite3 CLI (si pas déjà fait)
# Sur macOS
brew install sqlite3

# Sur Ubuntu/Debian
sudo apt-get install sqlite3

# Ouvrir la base
sqlite3 database/eduplatform.db

# Lister les tables
.tables

# Afficher la structure d'une table
.schema compte

# Quitter
.quit
```

### Sauvegarder la base

```bash
# Créer une copie de sauvegarde
cp database/eduplatform.db database/eduplatform.backup.db
```

### Exporter en SQL

```bash
sqlite3 database/eduplatform.db .dump > backup.sql
```

## ⚠️ Important

- ❌ **NE JAMAIS** commiter le fichier `eduplatform.db`
- ✅ Toujours commiter `schema.sql` et `seed.sql`
- 🔄 Utiliser `npm run db:reset` après un pull avec modifications DB
- 🔐 Les mots de passe sont hashés avec bcrypt (10 rounds)
