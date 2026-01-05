import { Controller, Get, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('spaces')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  // Récupère tous les espaces attribués au formateur connecté
  @Get('my-spaces')
  @Roles('FORMATEUR')
  async getMySpaces(@Request() req) {
    return this.spacesService.findByFormateur(req.user.userId);
  }

  // Récupère les détails d'un espace (matière, promo, travaux)
  @Get(':id')
  @Roles('FORMATEUR')
  async getSpaceDetails(@Param('id', ParseIntPipe) id: number) {
    return this.spacesService.getSpaceDetails(id);
  }

  // Liste des étudiants inscrits à cet espace spécifique
  @Get(':id/students')
  @Roles('FORMATEUR')
  async getSpaceStudents(@Param('id', ParseIntPipe) id: number) {
    // Cette méthode doit être ajoutée à votre SpacesService
    return this.spacesService.findStudentsInSpace(id);
  }
}