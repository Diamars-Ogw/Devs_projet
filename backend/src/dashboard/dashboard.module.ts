import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { SpacesModule } from '../spaces/spaces.module';
import { SubmissionsModule } from '../submissions/submissions.module';
import { EvaluationsModule } from '../evaluations/evaluations.module';

@Module({
  imports: [
    SpacesModule,      // Importe les capacités de gestion des cours
    SubmissionsModule, // Importe la gestion des rendus
    EvaluationsModule  // Importe la gestion des notes
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}