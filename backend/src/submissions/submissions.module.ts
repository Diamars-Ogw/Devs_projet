import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmissionsController } from './submissions.controller';
import { SubmissionsService } from './submissions.service';
import { Livraison } from './entities/livraison.entity';
import { Travail } from '../works/entities/travail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Livraison, Travail])
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
  exports: [SubmissionsService], // Permet au Dashboard de voir les travaux non corrigés
})
export class SubmissionsModule {}