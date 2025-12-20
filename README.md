# 🎓 EduPlatform

Plateforme de gestion pédagogique complète pour établissements d'enseignement supérieur.

[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.x-blue.svg)](https://reactjs.org/)
[![NestJS](https://img.shields.io/badge/nestjs-10.x-red.svg)](https://nestjs.com/)

---

## 📋 Table des matières

- [À propos](#à-propos)
- [Technologies](#technologies)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Démarrage rapide](#démarrage-rapide)
- [Structure du projet](#structure-du-projet)
- [Documentation](#documentation)
- [Contribution](#contribution)
- [Équipe](#équipe)

---

## 📖 À propos

**EduPlatform** est une plateforme web moderne permettant de gérer :

- ✅ Comptes utilisateurs (Directeurs, Formateurs, Étudiants, Techniciens)
- ✅ Promotions et espaces pédagogiques
- ✅ Travaux individuels et collectifs
- ✅ Livraisons et évaluations
- ✅ Suivi des notes et statistiques

---

## 🛠️ Technologies

### Frontend

- **React 18** - Bibliothèque UI
- **Vite** - Build tool ultra-rapide
- **React Router v6** - Navigation
- **Tailwind CSS** - Framework CSS utility-first
- **Axios** - Client HTTP
- **Lucide React** - Icônes modernes

### Backend

- **NestJS** - Framework Node.js progressif
- **TypeORM** - ORM TypeScript
- **SQLite** - Base de données légère
- **Passport JWT** - Authentification
- **Bcrypt** - Hachage des mots de passe
- **Swagger** - Documentation API

---

## 📦 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** >= 18.x ([Télécharger](https://nodejs.org/))
- **npm** >= 9.x (inclus avec Node.js)
- **Git** ([Télécharger](https://git-scm.com/))

Vérifier les versions :

```bash
node --version   # Doit afficher v18.x ou supérieur
npm --version    # Doit afficher 9.x ou supérieur
git --version    # Doit afficher 2.x ou supérieur
```

---

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/votre-organisation/eduplatform.git
cd eduplatform
```

### 2. Installation Backend

```bash
cd backend

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env

# Créer la base de données
npm run db:create

# (Optionnel) Insérer des données de test
# npm run db:seed
```

### 3. Installation Frontend

```bash
cd ../frontend

# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env
```

---

## ▶️ Démarrage rapide

### Démarrer le Backend (Terminal 1)

```bash
cd backend
npm run start:dev
```

Le serveur démarre sur : **http://localhost:3000**  
Documentation API : **http://localhost:3000/api/docs**

### Démarrer le Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

L'application démarre sur : **http://localhost:5173**

---

## 📁 Structure du projet

```
eduplatform/
├── frontend/              # Application React
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages par rôle
│   │   ├── services/      # Services API
│   │   └── routes/        # Configuration routes
│   └── package.json
│
├── backend/               # API NestJS
│   ├── src/
│   │   ├── auth/          # Module authentification
│   │   ├── users/         # Module utilisateurs
│   │   ├── promotions/    # Module promotions
│   │   ├── spaces/        # Module espaces
│   │   └── ...
│   ├── database/          # Base SQLite + scripts SQL
│   └── package.json
│
├── docs/                  # Documentation
└── README.md
```

Voir les README spécifiques pour plus de détails :

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)
- [Database README](./backend/database/README.md)

---

## 📖 Documentation

- 📘 [Guide de contribution](./CONTRIBUTING.md)
- 📗 [Documentation API](./docs/API.md)
- 📙 [Modèle de données](./docs/DATABASE.md)
- 📕 [Guide de déploiement](./docs/DEPLOYMENT.md)

---

## 🤝 Contribution

Nous suivons un workflow Git strict. Consultez [CONTRIBUTING.md](./CONTRIBUTING.md) pour :

- Convention de nommage des branches
- Format des commits
- Processus de Pull Request
- Standards de code

### Workflow rapide

```bash
# 1. Créer une branche depuis develop
git checkout develop
git pull origin develop
git checkout -b feature/US2.1-creation-formateur

# 2. Faire vos modifications
git add .
git commit -m "feat(users): ajout création formateur (US2.1)"

# 3. Pousser et créer une PR
git push origin feature/US2.1-creation-formateur
```

---

## 🧪 Tests

### Backend

```bash
cd backend
npm run test              # Tests unitaires
npm run test:e2e          # Tests end-to-end
npm run test:cov          # Couverture de code
```

### Frontend

```bash
cd frontend
npm run test              # Tests unitaires
```

---
