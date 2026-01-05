import { IsInt, IsOptional, IsString, IsUrl, ValidateIf } from 'class-validator';

export class CreateSubmissionDto {
  @IsInt()
  @IsOptional()
  affectation_id?: number;

  @IsInt()
  @IsOptional()
  groupe_id?: number;

  @IsString()
  @IsOptional()
  @ValidateIf(o => !o.fichier_url || o.contenu)
  contenu?: string;

  @IsUrl()
  @IsOptional()
  @ValidateIf(o => !o.contenu || o.fichier_url)
  fichier_url?: string;
}