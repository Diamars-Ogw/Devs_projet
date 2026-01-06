const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../database/eduplatform.db');
const seedPath = path.join(__dirname, '../database/seed.sql');

// Lire le fichier SQL
const sql = fs.readFileSync(seedPath, 'utf8');

// Connexion à la base
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Erreur de connexion:', err.message);
    process.exit(1);
  }
  console.log('✅ Connecté à la base de données');
});

// Exécuter le script SQL
db.exec(sql, (err) => {
  if (err) {
    console.error('❌ Erreur lors de l\'insertion:', err.message);
    process.exit(1);
  }
  
  console.log('✅ Données de test insérées avec succès !');
  
  // Vérifier les données
  db.get('SELECT COUNT(*) as count FROM compte', (err, row) => {
    if (err) {
      console.error('Erreur:', err.message);
    } else {
      console.log(`📊 Comptes créés: ${row.count}`); // ← CORRECTION ICI (backticks au lieu de `)
    }
    
    db.close((err) => {
      if (err) {
        console.error('Erreur fermeture:', err.message);
      }
      console.log('✅ Base de données fermée');
    });
  });
});