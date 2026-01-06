# Script d'installation automatique pour EduPlatform Backend (Windows)
# Usage: .\setup.ps1

Write-Host "🚀 Installation d'EduPlatform Backend" -ForegroundColor Blue
Write-Host "======================================" -ForegroundColor Blue
Write-Host ""

# Vérifier Node.js
Write-Host "📦 Vérification de Node.js..." -ForegroundColor Cyan
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js installé: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js n'est pas installé" -ForegroundColor Red
    Write-Host "Installez Node.js depuis https://nodejs.org" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Vérifier npm
Write-Host "📦 Vérification de npm..." -ForegroundColor Cyan
try {
    $npmVersion = npm -v
    Write-Host "✅ npm installé: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm n'est pas installé" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Installation des dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dépendances installées" -ForegroundColor Green
} else {
    Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Création du fichier .env
Write-Host "⚙️  Configuration de l'environnement..." -ForegroundColor Cyan
if (-Not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "✅ Fichier .env créé" -ForegroundColor Green
} else {
    Write-Host "⚠️  Le fichier .env existe déjà" -ForegroundColor Yellow
}
Write-Host ""

# Création des dossiers nécessaires
Write-Host "📁 Création des dossiers..." -ForegroundColor Cyan
New-Item -ItemType Directory -Force -Path database | Out-Null
New-Item -ItemType Directory -Force -Path uploads | Out-Null
New-Item -ItemType File -Force -Path uploads\.gitkeep | Out-Null
Write-Host "✅ Dossiers créés" -ForegroundColor Green
Write-Host ""

# Premier démarrage pour créer les tables
Write-Host "🚀 Premier démarrage pour créer les tables..." -ForegroundColor Cyan
Write-Host "⚠️  Le serveur va démarrer, appuyez sur Ctrl+C après quelques secondes" -ForegroundColor Yellow
Write-Host ""

$job = Start-Job -ScriptBlock { 
    Set-Location $using:PWD
    npm run start:dev 
}

# Attendre 10 secondes
Start-Sleep -Seconds 10

# Arrêter le job
Stop-Job -Job $job
Remove-Job -Job $job

Write-Host ""
Write-Host "✅ Tables créées" -ForegroundColor Green
Write-Host ""

# Insertion des données de test
Write-Host "💾 Insertion des données de test..." -ForegroundColor Cyan
if (Test-Path database\seed.sql) {
    try {
        $sqliteCommand = Get-Command sqlite3 -ErrorAction Stop
        sqlite3 database\eduplatform.db < database\seed.sql
        Write-Host "✅ Données de test insérées" -ForegroundColor Green
    } catch {
        Write-Host "⚠️  SQLite3 n'est pas disponible" -ForegroundColor Yellow
        Write-Host "Vous devrez insérer les données manuellement:" -ForegroundColor Yellow
        Write-Host "  sqlite3 database\eduplatform.db < database\seed.sql" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ Fichier seed.sql introuvable" -ForegroundColor Red
}
Write-Host ""

# Résumé
Write-Host ""
Write-Host "======================================" -ForegroundColor Blue
Write-Host "✅ Installation terminée !" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Blue
Write-Host ""
Write-Host "📝 Pour démarrer le serveur:" -ForegroundColor Cyan
Write-Host "  npm run start:dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Le serveur sera accessible sur:" -ForegroundColor Cyan
Write-Host "  http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "🧪 Comptes de test:" -ForegroundColor Cyan
Write-Host "  Directeur: jean.dupont@academie.fr / password123" -ForegroundColor White
Write-Host "  Formateur: sophie.martin@academie.fr / password123" -ForegroundColor White
Write-Host "  Étudiant: marie.durand@academie.fr / password123" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "  README.md - Documentation générale" -ForegroundColor White
Write-Host "  INSTALLATION_GUIDE.md - Guide d'installation" -ForegroundColor White
Write-Host "  API_TEST_EXAMPLES.md - Exemples de tests API" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Bon développement !" -ForegroundColor Green
Write-Host ""