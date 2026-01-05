import { Controller, Get, Post, Put, Body, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('evaluations')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  /**
   * Créer une nouvelle note pour une livraison.
   * Accessible uniquement par les FORMATEURS.
   */
  @Post()
  @Roles('FORMATEUR')
  async createEvaluation(@Body() createDto: any, @Request() req) {
    // On injecte l'ID du formateur connecté comme auteur de la note
    return this.evaluationsService.create(
        { ...createDto },      // Argument 1 : le DTO
        req.user.userId        // Argument 2 : l'ID (formateurId)
    );
  }

  /**
   * Modifier une note existante.
   * Le schéma SQL permet la modification avec traçabilité (updated_at).
   */
  @Put(':id')
  @Roles('FORMATEUR', 'DIRECTEUR')
  async updateEvaluation(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: any
  ) {
    return this.evaluationsService.update(id, updateDto);
  }

  /**
   * Récupérer la moyenne d'un espace pédagogique spécifique.
   * Utile pour les graphiques de performance du dashboard.
   */
  @Get('space/:spaceId/average')
  @Roles('FORMATEUR', 'DIRECTEUR')
  async getSpaceAverage(@Param('spaceId', ParseIntPipe) spaceId: number) {
    return this.evaluationsService.calculateAverageBySpace(spaceId);
  }

  /**
   * Récupérer toutes les notes pour un travail donné.
   * Permet de voir en un coup d'œil qui a été noté ou non.
   */
  @Get('work/:workId')
  @Roles('FORMATEUR')
  async getWorkEvaluations(@Param('workId', ParseIntPipe) workId: number) {
    return this.evaluationsService.findAllByWork(workId);
  }
}