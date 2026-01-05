import { Controller, Get, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('submissions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  // Liste toutes les livraisons pour un travail donné
  @Get('work/:workId')
  @Roles('FORMATEUR')
  async getSubmissionsByWork(@Param('workId', ParseIntPipe) workId: number) {
    return this.submissionsService.findAllByWork(workId);
  }

  // Récupère une livraison précise pour la corriger
  @Get(':id')
  @Roles('FORMATEUR')
  async getSubmissionDetails(@Param('id', ParseIntPipe) id: number) {
    return this.submissionsService.findOne(id);
  }
}