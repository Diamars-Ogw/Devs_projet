import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService{
    sendActivation(email:string,password:string){
        console.log('activation envoyé a ${email}');
    }
    sendNotificationtion(email:string,message:string){
        console.log('Notification envoyé a ${email} : {message}');
    }

}