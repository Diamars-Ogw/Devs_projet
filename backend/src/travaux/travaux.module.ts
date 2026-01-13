import { Module } from '@nestjs/common';
import { TravauxController } from './travaux.controller';
import { TravauxService } from './travaux.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Travail } from 'src/entities/travail.entity';
import { EspacePedagogique } from 'src/entities/espace-pedagogique.entity';
import { InscriptionEtudiant } from 'src/entities/inscription-etudiant.entity';
import { Formateur } from 'src/entities/formateur.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Travail,EspacePedagogique,InscriptionEtudiant,Formateur
    ]),
  ],
  controllers: [TravauxController],
  providers: [TravauxService]
})
export class TravauxModule {}
