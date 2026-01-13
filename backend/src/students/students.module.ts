import { Module } from '@nestjs/common';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etudiant } from 'src/entities/etudiant.entity';

@Module({
 imports: [
    TypeOrmModule.forFeature([Etudiant]),
   /* DashboardModule,
    CoursesModule,
    TravauxModule,
    LivraisonsModule, */
  ],
  controllers: [StudentsController],
  providers: [StudentsService]
})
export class StudentsModule {}
