import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpacesController } from './spaces.controller';
import { SpacesService } from './spaces.service';
import { EspacePedagogique } from './entities/espace-pedagogique.entity';
import { InscriptionEtudiant } from './entities/inscription-etudiant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EspacePedagogique, InscriptionEtudiant])
  ],
  controllers: [SpacesController],
  providers: [SpacesService],
  exports: [SpacesService], // Permet au Dashboard d'utiliser SpacesService
})
export class SpacesModule {}