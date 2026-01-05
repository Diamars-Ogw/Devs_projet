import { IsNumber, IsNotEmpty, Min, Max, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateEvaluationDto {
  @IsInt()
  @IsNotEmpty()
  livraison_id: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'La note minimale est 0' }) //
  @Max(20, { message: 'La note maximale est 20' }) //
  note: number;

  @IsString()
  @IsOptional()
  commentaire?: string;
}