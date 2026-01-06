import { IsNumber, IsString, IsNotEmpty, Min, Max } from 'class-validator';

export class UpdateEvaluationDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(20)
  note: number;

  @IsString()
  @IsNotEmpty()
  raison_modification: string;

  @IsNumber()
  @IsNotEmpty()
  modificateur_id: number;
}