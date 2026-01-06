import { IsString, IsNotEmpty, IsNumber, IsOptional, IsDateString, IsBoolean, IsArray } from 'class-validator';

export class CreateSpaceDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsNumber()
  @IsOptional()
  promotion_id?: number;

  @IsNumber()
  @IsOptional()
  matiere_id?: number;

  @IsNumber()
  @IsOptional()
  formateur_id?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  semestre?: number;

  @IsNumber()
  @IsOptional()
  volume_horaire_total?: number;

  @IsDateString()
  @IsOptional()
  date_debut?: string;

  @IsDateString()
  @IsOptional()
  date_fin?: string;

  @IsBoolean()
  @IsOptional()
  est_actif?: boolean;

  @IsString()
  @IsOptional()
  parametres?: string;

  @IsArray()
  @IsOptional()
  formateurs_secondaires?: number[];
}