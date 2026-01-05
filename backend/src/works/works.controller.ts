import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { WorksService } from './works.service';
import { CreateWorkDto } from './dto/create-work.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('works')
@UseGuards(JwtAuthGuard, RolesGuard)
export class WorksController {
  constructor(private readonly worksService: WorksService) {}

  @Post()
  @Roles('FORMATEUR')
  create(@Body() createWorkDto: CreateWorkDto, @Request() req) {
    return this.worksService.createWork(createWorkDto, req.user.userId);
  }

  @Get('espace/:espaceId')
  @Roles('FORMATEUR')
  findByEspace(@Param('espaceId') espaceId: number) {
    return this.worksService.findAllByEspace(espaceId);
  }
}