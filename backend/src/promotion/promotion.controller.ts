import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { PromotionService } from "./promotion.service";
import { Roles } from "src/auth/guards/roles.decorator";
import { assignStudentDto } from "./dto/assign-student.dto";
import { CreatePromotionDto } from "./dto/create-promotion.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('promotion')
export class PromotionController {
    constructor(
        private readonly promotionService: PromotionService
    ) {}
    
    @UseGuards(JwtAuthGuard)
    @Roles('DIRECTEUR','FORMATEUR')
    @Post()
    create(@Body() dto:CreatePromotionDto){
        return this.promotionService.create(dto);
    }
    
    @Get()
    FindAll(){
        return this.promotionService.findAll();
    }
    
    @Roles('DIRECTEUR','FORMATEUR')
    @Post(':id/assign')
    assigner(@Param('id')promoId:number, @Body() dto:assignStudentDto){
        return this.promotionService.assignStudent(promoId,dto.etudiantId);
    }
}
