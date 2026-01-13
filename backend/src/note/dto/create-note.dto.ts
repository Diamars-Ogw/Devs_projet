// src/notes/dto/create-note.dto.ts
import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';

export class CreateEvaluationDto {
  @IsNumber()
  livraisonId: number;

  @IsNumber()
  @Min(0)
  @Max(20)
  note: number;

  @IsOptional()
  @IsString()
  commentaire?: string;
}
