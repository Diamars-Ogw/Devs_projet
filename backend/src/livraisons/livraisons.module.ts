import { Module } from '@nestjs/common';
import { LivraisonsController } from './livraisons.controller';
import { LivraisonsService } from './livraisons.service';
import { Livraison } from 'src/entities/livraison.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affectation } from 'src/entities/affectation.entity';
import { Group } from 'src/entities/group.entity';
import { GroupMember } from 'src/entities/group_member.entity';
import { Travail } from 'src/entities/travail.entity';
import { Etudiant } from 'src/entities/etudiant.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Livraison,
      Affectation,                
      Group,
      GroupMember,
      Travail,
      Etudiant
    ]),
  ],
  controllers: [LivraisonsController],
  providers: [LivraisonsService]
})
export class LivraisonsModule {}
