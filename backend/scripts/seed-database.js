// backend/scripts/seed-database.js
// Script pour insérer les données initiales dans la base de données

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

// Chemins des fichiers
const dbPath = path.join(__dirname, '..', 'database', 'eduplatform.db');
const seedPath = path.join(__dirname, '..', 'database', 'seed.sql');


// Fonction principale
async function seedDatabase() {

  console.log('🌱 Insertion des données initiales...\n');
  const dt = new sqlite3.Database(dbPath);

  const saltRounds = 10;
  const USER=[
  {email:'directeur@edu.com', password:'Directeur@123'},
  {email:'formateur@edu.com', password:'Formateur@123'},
  {email:'etudiant1@edu.com', password:'Etudiant@123'}, 
  {email:'etudiant2@edu.com', password:'Etudiant@123'},
  {email:'etudiant3@edu.com', password:'Etudiant@123'}, 
  ]
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
  console.log('📄 Fichier seed.sql chargé\n');

  // Lire le fichier SQL
  const seedSQL = fs.readFileSync(seedPath, 'utf8');
  dt.serialize(async()=>{
    dt.exec(seedSQL,(err)=>{
      if(err) return console.error("Erreur SQL:",err.message)
      console.log('structure et donnee de base insere.')
    });
    console.log('🔐 Génération des mots de passe sécurisés...');

    for (const user of USER){
      try
        {const hash=await bcrypt.hash(user.password,saltRounds);

        dt.run(
          'UPDATE compte SET mot_de_passe=? WHERE TRIM(email)=TRIM(?)',
          [hash,user.email],
          (err)=>{if (err) console.log('erreur pour ${user.email}:',err.message); 
            else console.log('Mot de passe hashé pour ${user.email}');
          }
        );
        }catch(error){
          console.error('erreur de hachage:',error);
        }
     }
  
   setTimeout(()=> {
    console.log('\n🎉 Base de données prête à être utilisée !\n');
    console.log('📝 Comptes de test créés:');
    console.log('   👔 Directeur:');
    console.log('      Email: directeur@edu.com');
    console.log('      Mot de passe: Admin@123\n');
    console.log('   👨‍🏫 Formateurs:');
    console.log('      Email: Formateur@edu.com');
    console.log('      Mot de passe: Formateur@123\n');
    console.log('   🎓 Étudiants:');
    console.log('      Email: etudiant@edu.com');
    console.log('      Mot de passe: Etudiant@123\n');
    
    dt.close();
  },1000);

    })
 
}

// Exécution
seedDatabase().catch((error) => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});