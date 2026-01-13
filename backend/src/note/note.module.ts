import { Module } from '@nestjs/common';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from 'src/entities/note.entity';
import { Livraison } from 'src/entities/livraison.entity';
import { Directeur } from 'src/entities/directeur.entity';
import { Formateur } from 'src/entities/formateur.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Note, Formateur, Directeur, Livraison]),
  ],
  controllers: [NoteController],
  providers: [NoteService]
})
export class NoteModule {}
