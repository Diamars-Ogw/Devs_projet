import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class EnrollStudentsDto {
  @IsArray()
  @IsNotEmpty()
  etudiant_ids: number[];
}

export class EnrollPromotionDto {
  @IsNumber()
  @IsNotEmpty()
  promotion_id: number;
}