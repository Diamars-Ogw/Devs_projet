const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbDir = path.join(__dirname, '../database');
const dbPath = path.join(dbDir, 'eduplatform.db');
const schemaPath = path.join(dbDir, 'schema.sql');

// Créer le dossier database s'il n'existe pas
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
  console.log('✅ Dossier database créé');
}

// Vérifier que le fichier schema.sql existe
if (!fs.existsSync(schemaPath)) {
  console.error('❌ Fichier schema.sql introuvable:', schemaPath);
  process.exit(1);
}

// Supprimer l'ancienne base si elle existe
if (fs.existsSync(dbPath)) {
  console.log('⚠️  Suppression de l\'ancienne base de données...');
  fs.unlinkSync(dbPath);
}

// Lire le schéma SQL
const schema = fs.readFileSync(schemaPath, 'utf8');

// Créer la nouvelle base
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erreur lors de la création de la base:', err.message);
    process.exit(1);
  }
  console.log('✅ Base de données créée');
});

// Activer les clés étrangères
db.run('PRAGMA foreign_keys = ON', (err) => {
  if (err) {
    console.error('❌ Erreur PRAGMA:', err.message);
  }
});

// Exécuter le schéma
db.exec(schema, (err) => {
  if (err) {
    console.error('❌ Erreur lors de la création du schéma:', err.message);
    console.error('\n📝 Détails de l\'erreur:');
    console.error('Message:', err.message);
    if (err.code) console.error('Code:', err.code);
    db.close();
    process.exit(1);
  }

  console.log('✅ Schéma créé avec succès');

  // Vérifier les tables créées
  db.all("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name", (err, tables) => {
    if (err) {
      console.error('❌ Erreur lors de la vérification:', err.message);
    } else {
      console.log('\n📊 Tables créées:');
      tables.forEach(table => {
        console.log(`  - ${table.name}`);
      });
      console.log(`\n✅ Total: ${tables.length} tables créées`);
    }

    db.close((err) => {
      if (err) {
        console.error('❌ Erreur fermeture:', err.message);
      }
      console.log('\n✅ Base de données fermée');
      console.log('\n💡 Vous pouvez maintenant exécuter: npm run seed');
    });
  });
});