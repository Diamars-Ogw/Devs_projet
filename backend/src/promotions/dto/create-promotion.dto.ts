import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  anneeAcademique: number;

  @IsString()
  @IsNotEmpty()
  niveauEtudes: string;

  @IsDateString()
  dateDebut: string;

  @IsDateString()
  dateFin: string;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  capaciteMaximale: number;

  @IsString()
  @IsOptional()
  description: string;
}
