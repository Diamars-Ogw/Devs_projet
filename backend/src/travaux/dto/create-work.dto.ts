import { IsString,IsNotEmpty,IsEnum, IsNumber, IsUUID, IsOptional, IsDateString } from "class-validator";
import { ModeGroupe, TravailType } from "src/entities/travail.entity";

export class CreateWorkDto{
    @IsUUID()
    espaceId:number;

    @IsString()
    @IsNotEmpty()
    titre:string;

     @IsString()
    @IsNotEmpty()
    consignes:string;

     @IsEnum(TravailType)
    type_travail:TravailType;

     @IsEnum(ModeGroupe)
    mode_groupe:ModeGroupe;

     @IsDateString()
    date_debut:string;

     @IsDateString()
    date_fin:string;
}