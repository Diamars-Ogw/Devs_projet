import { IsString,IsOptional,IsBoolean } from "class-validator";

export class UpdateSpaceDto{
    @IsString()
    @IsOptional()
    nom?:string;

    @IsString()
    @IsOptional()
    description?:string;

    @IsBoolean()
    @IsOptional()
    est_actif?:boolean;
}