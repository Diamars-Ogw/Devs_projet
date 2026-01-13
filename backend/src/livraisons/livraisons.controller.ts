import { Body, Controller, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LivraisonsService } from './livraisons.service';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateLivraisonDto } from './dto/create-livraison.dto';

@Controller('livraison')
export class LivraisonsController {
  constructor(private readonly livraisonsService: LivraisonsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('rendre/:id')
  submit(@Param('id',ParseIntPipe)travailId:number, @Body() dto:CreateLivraisonDto,@CurrentUser() user:any) {
    return this.livraisonsService.rendreTravail(user.id,travailId,dto);
  }

 /* @Post('groups/:id/members')
  addMember(@Param('id') id:number,@Body() dto: AddMemberDto){
    return this.livraisonsService.addMember(id,dto)
  }*/

}
