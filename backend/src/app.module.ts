import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from './students/students.module';
import { LivraisonsModule } from './livraisons/livraisons.module';
import { TravauxModule } from './travaux/travaux.module';
import { NoteModule } from './note/note.module';
import { AuthModule } from './auth/auth.module';
import { Compte } from './entities/compte.entity';
import { Etudiant } from './entities/etudiant.entity';
import { Promotion } from './entities/promotion.entity';
import { EspacePedagogique } from './entities/espace-pedagogique.entity';
import { Travail } from './entities/travail.entity';
import { Livraison } from './entities/livraison.entity';
import { Note } from './entities/note.entity';
import { PromotionModule } from './promotion/promotion.module';
import { SpaceModule } from './space/space.module';
import { Matiere } from './entities/matiere.entity';
import { Affectation } from './entities/affectation.entity';
import { Formateur } from './entities/formateur.entity';
import { Group } from './entities/group.entity';
import { GroupMember } from './entities/group_member.entity';
import { InscriptionEtudiant } from './entities/inscription-etudiant.entity';
import { Directeur } from './entities/directeur.entity';


@Module({
  imports: [
    // Configuration TypeORM avec SQLite
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database:  './database/eduplatform.db',
      entities: [
        Compte,
        Etudiant,
        Promotion,
        EspacePedagogique,
        InscriptionEtudiant,
        Matiere,
        Travail,
        Directeur,
        Livraison,
        Affectation,
        Formateur,
        Group,
        GroupMember,
        Note],
      synchronize: false,
      logging: true,
      extra: {
    busyTimeout: 10000 },
    }),
    //sécurité
    StudentsModule,
    AuthModule,
    
    //logique métier
    LivraisonsModule,

    TravauxModule,

    PromotionModule,

    NoteModule,

    SpaceModule,

    // Modules fonctionnels (à ajouter au fur et à mesure)
    // AuthModule,
    // UsersModule,
    // PromotionsModule,
    // SpacesModule,
    // WorksModule,
    // SubmissionsModule,
    // EvaluationsModule,
    // EmailsModule,
  ],

})
export class AppModule {}
