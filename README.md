# EduPlatform Backend

Backend API pour la plateforme de gestion pédagogique EduPlatform.

## 🚀 Technologies

- **Framework**: NestJS
- **Base de données**: SQLite avec TypeORM
- **Validation**: class-validator
- **Authentification**: JWT (à venir)
- **Language**: TypeScript

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env
```

## 🗄️ Base de données

```bash
# Créer la base de données (la structure sera créée automatiquement par TypeORM)
# Assurez-vous que le dossier database/ existe
mkdir -p database

# Insérer les données de test
sqlite3 database/eduplatform.db < database/seed.sql
```

## 🏃 Lancement

```bash
# Mode développement
npm run start:dev

# Mode production
npm run build
npm run start:prod
```

Le serveur démarre sur `http://localhost:5000`

## 📚 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion

### Utilisateurs
- `GET /api/users` - Liste des utilisateurs
- `GET /api/users/:id` - Détails d'un utilisateur
- `POST /api/users` - Créer un utilisateur
- `PATCH /api/users/:id` - Modifier un utilisateur
- `DELETE /api/users/:id` - Supprimer un utilisateur
- `GET /api/users/statistics` - Statistiques utilisateurs
- `GET /api/users/inactive` - Comptes inactifs

### Promotions
- `GET /api/promotions` - Liste des promotions
- `GET /api/promotions/:id` - Détails d'une promotion
- `POST /api/promotions` - Créer une promotion
- `PATCH /api/promotions/:id` - Modifier une promotion
- `DELETE /api/promotions/:id` - Supprimer une promotion
- `GET /api/promotions/:id/students` - Étudiants d'une promotion
- `GET /api/promotions/statistics` - Statistiques promotions

### Espaces pédagogiques
- `GET /api/spaces` - Liste des espaces
- `GET /api/spaces/:id` - Détails d'un espace
- `POST /api/spaces` - Créer un espace
- `PATCH /api/spaces/:id` - Modifier un espace
- `DELETE /api/spaces/:id` - Supprimer un espace
- `GET /api/spaces/:id/students` - Étudiants inscrits
- `POST /api/spaces/:id/enroll` - Inscrire des étudiants
- `POST /api/spaces/:id/enroll-promotion` - Inscrire une promotion
- `DELETE /api/spaces/:espaceId/students/:etudiantId` - Désinscrire un étudiant
- `GET /api/spaces/statistics` - Statistiques espaces

### Matières
- `GET /api/spaces/matieres/all` - Liste des matières
- `GET /api/spaces/matieres/:id` - Détails d'une matière
- `POST /api/spaces/matieres` - Créer une matière

### Évaluations
- `GET /api/evaluations` - Liste des évaluations
- `GET /api/evaluations/:id` - Détails d'une évaluation
- `PATCH /api/evaluations/:id/modify` - Modifier une évaluation (Directeur)
- `GET /api/evaluations/:id/history` - Historique des modifications
- `GET /api/evaluations/statistics` - Statistiques évaluations

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Couverture
npm run test:cov
```

## 📝 Données de test

Le fichier `database/seed.sql` contient des données de test :

**Directeur:**
- Email: jean.dupont@academie.fr
- Mot de passe: password123

**Formateurs:**
- sophie.martin@academie.fr
- julie.petit@academie.fr
- jean.martin@academie.fr

**Étudiants:**
- marie.durand@academie.fr (actif)
- pierre.bernard@academie.fr (inactif)
- laura.roux@academie.fr (inactif)

Tous utilisent le même mot de passe: `password123`

## 🏗️ Structure du projet

```
backend/
├── src/
│   ├── auth/              # Authentification
│   ├── users/             # Gestion utilisateurs
│   ├── promotions/        # Gestion promotions
│   ├── spaces/            # Espaces pédagogiques
│   ├── evaluations/       # Évaluations
│   ├── common/            # Éléments communs
│   │   ├── decorators/
│   │   ├── filters/
│   │   └── pipes/
│   ├── config/            # Configuration
│   ├── app.module.ts
│   └── main.ts
├── database/              # Base de données SQLite
└── uploads/               # Fichiers uploadés
```

## 🔒 Sécurité

- Mots de passe hashés avec bcrypt
- Validation des données avec class-validator
- Protection CORS configurée
- Variables d'environnement pour les secrets

## 📄 Licence

MIT