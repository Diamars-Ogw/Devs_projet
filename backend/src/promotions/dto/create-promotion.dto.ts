import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, IsBoolean } from 'class-validator';

export class CreatePromotionDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  annee_academique: number;

  @IsString()
  @IsOptional()
  niveau_etudes?: string;

  @IsDateString()
  @IsNotEmpty()
  date_debut: string;

  @IsDateString()
  @IsNotEmpty()
  date_fin: string;

  @IsNumber()
  @IsOptional()
  capacite_max?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  est_active?: boolean;
}