import { IsNumber } from "class-validator";

export class AddMemberDto{
    @IsNumber()
    etudiantId:number;
}