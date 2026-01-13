import { IsString, IsOptional, ValidateIf } from 'class-validator';

export class CreateLivraisonDto {
  @IsOptional()
  @IsString()
  @ValidateIf(o => !o.fichierUrl)
  contenu?: string;

  @IsOptional()
  @IsString()
  @ValidateIf(o => !o.contenu)
  fichierUrl?: string;
}