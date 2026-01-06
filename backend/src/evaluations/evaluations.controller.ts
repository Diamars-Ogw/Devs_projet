import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { UpdateEvaluationDto } from './dto/update-evaluation.dto';

@Controller('evaluations')
export class EvaluationsController {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Get()
  findAll() {
    return this.evaluationsService.findAll();
  }

  @Get('statistics')
  getStatistics() {
    return this.evaluationsService.getStatistics();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.evaluationsService.findOne(+id);
  }

  @Get(':id/history')
  getHistory(@Param('id') id: string) {
    return this.evaluationsService.getEvaluationHistory(+id);
  }

  @Patch(':id/modify')
  updateByDirector(@Param('id') id: string, @Body() updateEvaluationDto: UpdateEvaluationDto) {
    return this.evaluationsService.updateByDirector(+id, updateEvaluationDto);
  }
}