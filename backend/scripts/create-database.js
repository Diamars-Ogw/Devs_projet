// backend/scripts/create-database.js
// Script pour créer la base de données SQLite à partir du schéma

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Chemins des fichiers
const dbPath = path.join(__dirname, '..', 'database', 'eduplatform.db');
const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');

// Fonction principale
async function createDatabase() {
  console.log('📦 Création de la base de données EduPlatform...\n');

  // Vérifier si le fichier schema.sql existe
  if (!fs.existsSync(schemaPath)) {
    console.error('❌ Erreur: Le fichier schema.sql est introuvable !');
    console.error(`   Chemin attendu: ${schemaPath}`);
    process.exit(1);
  }

  // Créer le dossier database s'il n'existe pas
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('✅ Dossier database créé');
  }

  // Supprimer l'ancienne base si elle existe
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('🗑️  Ancienne base de données supprimée');
  }

  // Lire le fichier SQL
  const schema = fs.readFileSync(schemaPath, 'utf8');
  console.log('📄 Fichier schema.sql chargé');

  // Créer la base de données
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('❌ Erreur lors de la création de la base:', err.message);
      process.exit(1);
    }
  });

  // Exécuter le schéma
  db.exec(schema, (err) => {
    if (err) {
      console.error("❌ Erreur lors de l'exécution du schéma:", err.message);
      db.close();
      process.exit(1);
    }

    console.log('✅ Structure de la base de données créée\n');

    // Vérifier les tables créées
    db.all(
      "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name",
      [],
      (err, rows) => {
        if (err) {
          console.error('❌ Erreur:', err.message);
        } else {
          console.log('📋 Tables créées:');
          rows.forEach((row) => {
            console.log(`   ✓ ${row.name}`);
          });

          console.log(`\n📍 Base de données créée avec succès !`);
          console.log(`   Emplacement: ${dbPath}`);
          
        }

        db.close();
      },
    );
  });
}

// Exécution
createDatabase().catch((error) => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});
