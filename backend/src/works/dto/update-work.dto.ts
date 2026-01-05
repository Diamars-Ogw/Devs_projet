import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkDto } from './create-work.dto';
import { IsEnum, IsOptional, IsInt, IsDateString, IsString } from 'class-validator';

export class UpdateWorkDto extends PartialType(CreateWorkDto) {
  // Les champs de CreateWorkDto sont automatiquement hérités comme optionnels.
  // On peut ajouter des champs spécifiques à la modification ici :

  @IsInt()
  @IsOptional()
  est_actif?: number; // Pour permettre au formateur de masquer/désactiver un travail

  @IsString()
  @IsOptional()
  titre?: string;

  @IsString()
  @IsOptional()
  consignes?: string;

  @IsDateString()
  @IsOptional()
  date_fin?: string;

  @IsEnum(['INDIVIDUEL', 'COLLECTIF'])
  @IsOptional()
  type_travail?: string;
}