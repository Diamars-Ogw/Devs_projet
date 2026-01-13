import { IsNumber, IsOptional, IsString } from 'class-validator';

export class SubmitLivraisonDto {

  @IsNumber()
  @IsOptional()
  groupeId?:number;

   @IsNumber()
  @IsOptional()
  affectationId:number;

  @IsOptional()
  @IsString()
  contenu?: string;

  @IsOptional()
  @IsString()
  fichier_url?: string;
}
