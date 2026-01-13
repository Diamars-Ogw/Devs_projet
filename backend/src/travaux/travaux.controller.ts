import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TravauxService } from './travaux.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('etudiant')
export class TravauxController {
  constructor(private readonly travauxService: TravauxService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('travaux')
  async getMyAssignments(@CurrentUser() user:any) {
    return await this.travauxService.findMyAssignments(user);
  }

}
