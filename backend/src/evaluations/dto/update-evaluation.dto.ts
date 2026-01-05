import { IsNumber, IsOptional, Min, Max, IsString, IsInt, ValidateIf } from 'class-validator';

export class UpdateEvaluationDto {
  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'La note minimale est 0' })
  @Max(20, { message: 'La note maximale est 20' })
  note?: number;

  @IsString()
  @IsOptional()
  commentaire?: string;

  // --- Champs de traçabilité (Modification par le Directeur) ---

  @IsInt()
  @IsOptional()
  modificateur_id?: number;

  @IsString()
  @IsOptional()
  @ValidateIf(o => o.modificateur_id !== undefined)
  raison_modification?: string;
}