import { IsString,IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateSpaceDto{
    @IsString()
    @IsNotEmpty()
    nom?:string;

    @IsString()
    @IsNotEmpty()
    annee:string;

    @IsString()
    @IsOptional()
    description:string;

    @IsNumber()
    promotionId:number;
}