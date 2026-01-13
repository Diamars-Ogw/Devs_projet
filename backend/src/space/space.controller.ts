import { Body, ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { SpaceService } from './space.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('space')
export class SpaceController {
  constructor(private readonly SpaceService: SpaceService) {}
  @UseGuards(JwtAuthGuard)
  @Get('my')
  findMine(@CurrentUser() user:any) {
    return this.SpaceService.findSpaceByUser(user);
  }
}
