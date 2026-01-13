import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { NoteService } from './note.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('evaluation')
export class NoteController {
  constructor(private readonly notesService: NoteService) {}
  @UseGuards(JwtAuthGuard)
  @Get('mes-notes')
  async create(@CurrentUser() user:any) {
    const livraisons = await this.notesService.obtenirMesEvaluations(user.compteId);
    return livraisons.map(l => ({
      travailTitre: l.affection?.travail?.titre || l.groupe?.travail?.titre,
      dateRendu: l.created_at,
      statutRendu: l.statut,
      note: l['evaluation']?.note || "Non noté",
      commentaire: l['evaluation']?.commentaire || "En attente de correction"
    }));
  }

}
