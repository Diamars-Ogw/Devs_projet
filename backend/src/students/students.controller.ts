import { ClassSerializerInterceptor, Controller, Get,Req,UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StudentsService } from './students.service';
import { Roles } from 'src/auth/guards/roles.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@UseInterceptors(ClassSerializerInterceptor ) //permet de filtrer les données comme un dto manuel 
@Controller('etudiant')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  //@Roles('ETUDIANT')
  @Get('me')
  getMe(@Req() req:any) {
    return this.studentsService.getProfile(req.userId || req.compteId);
  }
/*
  @Get('dashboard')
  getDashboard(@Req() req) {
    return this.studentsService.getDashboard(req.user.sub);
  }
*/
}

