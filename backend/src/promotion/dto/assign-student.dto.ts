import { IsNumber } from "class-validator";

export class assignStudentDto{
    @IsNumber()
    etudiantId:number
}