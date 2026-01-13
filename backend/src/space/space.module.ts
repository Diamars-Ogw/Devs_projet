import { Module } from '@nestjs/common';
import { SpaceController } from './space.controller';
import { SpaceService } from './space.service';
import { EspacePedagogique } from 'src/entities/espace-pedagogique.entity';
import { Promotion } from 'src/entities/promotion.entity';
import { Compte } from 'src/entities/compte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiant } from 'src/entities/etudiant.entity';
import { InscriptionEtudiant } from 'src/entities/inscription-etudiant.entity';


@Module({
  imports:[
      TypeOrmModule.forFeature([EspacePedagogique,Promotion,Compte,Etudiant,InscriptionEtudiant]),
    ],  
  controllers: [SpaceController],
  providers: [SpaceService],
  exports:[SpaceService]
})
export class SpaceModule {}
