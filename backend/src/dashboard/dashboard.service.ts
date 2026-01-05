import { Injectable } from '@nestjs/common';
import { SpacesService } from '../spaces/spaces.service';
import { SubmissionsService } from '../submissions/submissions.service';
import { EvaluationsService } from '../evaluations/evaluations.service';

@Injectable()
export class DashboardService {
  constructor(
    private readonly spacesService: SpacesService,
    private readonly submissionsService: SubmissionsService,
    private readonly evaluationsService: EvaluationsService,
  ) {}

  async getTrainerStats(trainerId: number) {
    // Récupération parallèle pour optimiser les performances
    const [spaces, studentCount, pendingCorrections, average] = await Promise.all([
      this.spacesService.findByFormateur(trainerId),
      this.spacesService.countUniqueStudents(trainerId),
      this.submissionsService.countPendingSubmissions(trainerId),
      this.evaluationsService.getTrainerAverage(trainerId),
    ]);

    return {
      overview: {
        totalSpaces: spaces.length,
        totalStudents: studentCount,
        pendingCorrections: pendingCorrections,
        performanceAverage: average || 0,
      },
      recentSpaces: spaces.slice(0, 5),
    };
  }
}