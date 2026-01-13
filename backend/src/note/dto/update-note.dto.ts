// src/notes/dto/create-note.dto.ts
import { IsNumber, IsString, Min, Max } from 'class-validator';

export class UpdateEvaluationDto {

  @IsNumber()
  @Min(0)
  @Max(20)
  note: number;

  @IsString()
  raison_modification?: string;
}
