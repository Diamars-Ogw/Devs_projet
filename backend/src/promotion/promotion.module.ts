import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiant } from 'src/entities/etudiant.entity';
import { Promotion } from 'src/entities/promotion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Promotion,Etudiant]),
  ],
  controllers: [PromotionController],
  providers: [PromotionService]
})
export class PromotionModule {}
