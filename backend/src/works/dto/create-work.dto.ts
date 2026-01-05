import { IsString, IsNotEmpty, IsEnum, IsDateString, IsOptional, IsInt, IsUrl } from 'class-validator';

export class CreateWorkDto {
  @IsInt()
  @IsNotEmpty()
  espace_pedagogique_id: number;

  @IsString()
  @IsNotEmpty()
  titre: string;

  @IsString()
  @IsNotEmpty()
  consignes: string;

  @IsEnum(['INDIVIDUEL', 'COLLECTIF'])
  type_travail: string;

  @IsEnum(['FORMATEUR', 'ETUDIANT', 'NON_APPLICABLE'])
  mode_groupe: string;

  @IsDateString()
  @IsNotEmpty()
  date_debut: string;

  @IsDateString()
  @IsNotEmpty()
  date_fin: string;

  @IsUrl()
  @IsOptional()
  fichier_consigne_url?: string;
}