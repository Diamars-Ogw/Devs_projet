import { IsString,IsNotEmpty,IsEnum, IsUUID, IsOptional, IsDateString } from "class-validator";

export class UpdateWorkDto{

    @IsString()
    @IsOptional()
    titre:string;

     @IsString()
    @IsOptional()
    consignes:string;

     @IsString()
     @IsOptional()
    est_actif:boolean;
}