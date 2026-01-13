import { IsNotEmpty, IsString } from "class-validator";

export class CreatePromotionDto{
    @IsString()
    @IsNotEmpty()
    nom?:string;

    @IsString()
    @IsNotEmpty()
    annee:string;

}