import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Compte } from './entities/compte.entity';
import { Directeur } from './entities/directeur.entity';
import { Formateur } from './entities/formateur.entity';
import { Etudiant } from './entities/etudiant.entity';
import { Technicien } from './entities/technicien.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Compte,
      Directeur,
      Formateur,
      Etudiant,
      Technicien,
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}