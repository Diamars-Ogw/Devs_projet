import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpacesService } from './spaces.service';
import { SpacesController } from './spaces.controller';
import { EspacePedagogique } from './entities/espace-pedagogique.entity';
import { Matiere } from './entities/matiere.entity';
import { FormateurSecondaire } from './entities/formateur-secondaire.entity';
import { InscriptionEtudiant } from './entities/inscription-etudiant.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EspacePedagogique,
      Matiere,
      FormateurSecondaire,
      InscriptionEtudiant,
    ]),
    UsersModule,
  ],
  controllers: [SpacesController],
  providers: [SpacesService],
  exports: [SpacesService, TypeOrmModule],
})
export class SpacesModule {}