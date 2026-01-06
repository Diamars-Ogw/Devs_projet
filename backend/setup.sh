#!/bin/bash

# Script d'installation automatique pour EduPlatform Backend
# Usage: ./setup.sh

echo "🚀 Installation d'EduPlatform Backend"
echo "======================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier Node.js
echo -e "${BLUE}📦 Vérification de Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js n'est pas installé${NC}"
    echo "Installez Node.js depuis https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo -e "${GREEN}✅ Node.js installé: $NODE_VERSION${NC}"
echo ""

# Vérifier npm
echo -e "${BLUE}📦 Vérification de npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm n'est pas installé${NC}"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo -e "${GREEN}✅ npm installé: $NPM_VERSION${NC}"
echo ""

# Installation des dépendances
echo -e "${BLUE}📦 Installation des dépendances...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dépendances installées${NC}"
else
    echo -e "${RED}❌ Erreur lors de l'installation des dépendances${NC}"
    exit 1
fi
echo ""

# Création du fichier .env
echo -e "${BLUE}⚙️  Configuration de l'environnement...${NC}"
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${GREEN}✅ Fichier .env créé${NC}"
else
    echo -e "${YELLOW}⚠️  Le fichier .env existe déjà${NC}"
fi
echo ""

# Création des dossiers nécessaires
echo -e "${BLUE}📁 Création des dossiers...${NC}"
mkdir -p database
mkdir -p uploads
touch uploads/.gitkeep
echo -e "${GREEN}✅ Dossiers créés${NC}"
echo ""

# Vérifier SQLite3
echo -e "${BLUE}🗄️  Vérification de SQLite3...${NC}"
if ! command -v sqlite3 &> /dev/null; then
    echo -e "${YELLOW}⚠️  SQLite3 n'est pas installé globalement${NC}"
    echo "Vous pourrez quand même utiliser l'application (SQLite3 est inclus dans les dépendances Node)"
else
    SQLITE_VERSION=$(sqlite3 --version | cut -d' ' -f1)
    echo -e "${GREEN}✅ SQLite3 installé: $SQLITE_VERSION${NC}"
fi
echo ""

# Premier démarrage pour créer les tables
echo -e "${BLUE}🚀 Premier démarrage pour créer les tables...${NC}"
echo -e "${YELLOW}Le serveur va démarrer, appuyez sur Ctrl+C après quelques secondes${NC}"
echo ""
npm run start:dev &
SERVER_PID=$!

# Attendre que le serveur démarre
sleep 10

# Arrêter le serveur
kill $SERVER_PID 2>/dev/null
wait $SERVER_PID 2>/dev/null

echo ""
echo -e "${GREEN}✅ Tables créées${NC}"
echo ""

# Insertion des données de test
echo -e "${BLUE}💾 Insertion des données de test...${NC}"
if [ -f database/seed.sql ]; then
    if command -v sqlite3 &> /dev/null; then
        sqlite3 database/eduplatform.db < database/seed.sql
        echo -e "${GREEN}✅ Données de test insérées${NC}"
    else
        echo -e "${YELLOW}⚠️  SQLite3 n'est pas disponible${NC}"
        echo "Vous devrez insérer les données manuellement:"
        echo "  sqlite3 database/eduplatform.db < database/seed.sql"
    fi
else
    echo -e "${RED}❌ Fichier seed.sql introuvable${NC}"
fi
echo ""

# Vérification des données
if command -v sqlite3 &> /dev/null; then
    echo -e "${BLUE}📊 Vérification des données...${NC}"
    
    COMPTE_COUNT=$(sqlite3 database/eduplatform.db "SELECT COUNT(*) FROM compte;" 2>/dev/null)
    PROMOTION_COUNT=$(sqlite3 database/eduplatform.db "SELECT COUNT(*) FROM promotion;" 2>/dev/null)
    ESPACE_COUNT=$(sqlite3 database/eduplatform.db "SELECT COUNT(*) FROM espace_pedagogique;" 2>/dev/null)
    
    if [ ! -z "$COMPTE_COUNT" ]; then
        echo -e "${GREEN}✅ Comptes: $COMPTE_COUNT${NC}"
        echo -e "${GREEN}✅ Promotions: $PROMOTION_COUNT${NC}"
        echo -e "${GREEN}✅ Espaces: $ESPACE_COUNT${NC}"
    fi
    echo ""
fi

# Résumé
echo ""
echo "======================================"
echo -e "${GREEN}✅ Installation terminée !${NC}"
echo "======================================"
echo ""
echo -e "${BLUE}📝 Pour démarrer le serveur:${NC}"
echo "  npm run start:dev"
echo ""
echo -e "${BLUE}🌐 Le serveur sera accessible sur:${NC}"
echo "  http://localhost:5000"
echo ""
echo -e "${BLUE}🧪 Comptes de test:${NC}"
echo "  Directeur: jean.dupont@academie.fr / password123"
echo "  Formateur: sophie.martin@academie.fr / password123"
echo "  Étudiant: marie.durand@academie.fr / password123"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "  README.md - Documentation générale"
echo "  INSTALLATION_GUIDE.md - Guide d'installation"
echo "  API_TEST_EXAMPLES.md - Exemples de tests API"
echo ""
echo -e "${GREEN}🎉 Bon développement !${NC}"
echo ""