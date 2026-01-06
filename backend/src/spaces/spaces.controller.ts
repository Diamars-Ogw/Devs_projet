import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
import { EnrollStudentsDto, EnrollPromotionDto } from './dto/enroll-students.dto';

@Controller('spaces')
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Post()
  create(@Body() createSpaceDto: CreateSpaceDto) {
    return this.spacesService.create(createSpaceDto);
  }

  @Get()
  findAll() {
    return this.spacesService.findAll();
  }

  @Get('statistics')
  getStatistics() {
    return this.spacesService.getStatistics();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spacesService.findOne(+id);
  }

  @Get(':id/students')
  getEnrolledStudents(@Param('id') id: string) {
    return this.spacesService.getEnrolledStudents(+id);
  }

  @Post(':id/enroll')
  enrollStudents(@Param('id') id: string, @Body() enrollStudentsDto: EnrollStudentsDto) {
    return this.spacesService.enrollStudents(+id, enrollStudentsDto);
  }

  @Post(':id/enroll-promotion')
  enrollPromotion(@Param('id') id: string, @Body() enrollPromotionDto: EnrollPromotionDto) {
    return this.spacesService.enrollPromotion(+id, enrollPromotionDto);
  }

  @Delete(':espaceId/students/:etudiantId')
  unenrollStudent(@Param('espaceId') espaceId: string, @Param('etudiantId') etudiantId: string) {
    return this.spacesService.unenrollStudent(+espaceId, +etudiantId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpaceDto: UpdateSpaceDto) {
    return this.spacesService.update(+id, updateSpaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spacesService.remove(+id);
  }

  // Endpoints pour les matières
  @Post('matieres')
  createMatiere(@Body() data: { nom: string; code: string; description?: string; nombre_credits?: number }) {
    return this.spacesService.createMatiere(data);
  }

  @Get('matieres/all')
  findAllMatieres() {
    return this.spacesService.findAllMatieres();
  }

  @Get('matieres/:id')
  findOneMatiere(@Param('id') id: string) {
    return this.spacesService.findOneMatiere(+id);
  }
}