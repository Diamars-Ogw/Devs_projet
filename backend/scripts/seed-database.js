// backend/scripts/seed-database.js
// Script pour insérer les données initiales dans la base de données

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// Chemins des fichiers
const dbPath = path.join(__dirname, '..', 'database', 'eduplatform.db');
const seedPath = path.join(__dirname, '..', 'database', 'seed.sql');

// Fonction pour générer les hash de mots de passe
async function generatePasswords() {
  const saltRounds = 10;
  return {
    admin: await bcrypt.hash('Admin@123', saltRounds),
    formateur: await bcrypt.hash('Formateur@123', saltRounds),
    etudiant: await bcrypt.hash('Etudiant@123', saltRounds),
  };
}

// Fonction principale
async function seedDatabase() {
  console.log('🌱 Insertion des données initiales...\n');

  // Vérifier si la base existe
  if (!fs.existsSync(dbPath)) {
    console.error('❌ Erreur: La base de données n\'existe pas !');
    console.error('   Exécutez d\'abord: npm run db:create');
    process.exit(1);
  }

  // Vérifier si le fichier seed.sql existe
  if (!fs.existsSync(seedPath)) {
    console.error('❌ Erreur: Le fichier seed.sql est introuvable !');
    console.error(`   Chemin attendu: ${seedPath}`);
    process.exit(1);
  }

  // Générer les mots de passe hashés
  console.log('🔐 Génération des mots de passe sécurisés...');
  const passwords = await generatePasswords();

  // Lire le fichier SQL
  let seedSQL = fs.readFileSync(seedPath, 'utf8');

  // Remplacer les hash de mots de passe par les vrais
  seedSQL = seedSQL
    .replace(/\$2b\$10\$abcdefghijklmnopqrstuvwxyz123456/g, passwords.admin)
    .replace(/('directeur@eduplatform.com', ')([^']+)(')/g, `$1${passwords.admin}$3`)
    .replace(/('.*formateur.*@eduplatform.com', ')([^']+)(')/g, `$1${passwords.formateur}$3`)
    .replace(/('.*etudiant.*@eduplatform.com', ')([^']+)(')/g, `$1${passwords.etudiant}$3`);

  console.log('📄 Fichier seed.sql chargé\n');

  // Connexion à la base
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('❌ Erreur de connexion:', err.message);
      process.exit(1);
    }
  });

  // Exécuter les insertions
  db.exec(seedSQL, (err) => {
    if (err) {
      console.error('❌ Erreur lors de l\'insertion des données:', err.message);
      db.close();
      process.exit(1);
    }

    console.log('✅ Données initiales insérées\n');

    // Afficher les statistiques
    const queries = [
      "SELECT COUNT(*) as count FROM compte",
      "SELECT COUNT(*) as count FROM etudiant",
      "SELECT COUNT(*) as count FROM formateur",
      "SELECT COUNT(*) as count FROM promotion",
      "SELECT COUNT(*) as count FROM matiere",
      "SELECT COUNT(*) as count FROM espace_pedagogique",
      "SELECT COUNT(*) as count FROM travail",
    ];

    const labels = [
      'Comptes',
      'Étudiants',
      'Formateurs',
      'Promotions',
      'Matières',
      'Espaces pédagogiques',
      'Travaux',
    ];

    console.log('📊 Statistiques:');

    let completed = 0;
    queries.forEach((query, index) => {
      db.get(query, [], (err, row) => {
        if (!err) {
          console.log(`   ✓ ${labels[index]}: ${row.count}`);
        }
        completed++;
        if (completed === queries.length) {
          console.log('\n🎉 Base de données prête à être utilisée !\n');
          console.log('📝 Comptes de test créés:');
          console.log('   👔 Directeur:');
          console.log('      Email: directeur@eduplatform.com');
          console.log('      Mot de passe: Admin@123\n');
          console.log('   👨‍🏫 Formateurs:');
          console.log('      Email: martin.dubois@eduplatform.com');
          console.log('      Mot de passe: Formateur@123\n');
          console.log('   🎓 Étudiants:');
          console.log('      Email: pierre.durand@eduplatform.com');
          console.log('      Mot de passe: Etudiant@123\n');

          db.close();
        }
      });
    });
  });
}

// Exécution
seedDatabase().catch((error) => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});