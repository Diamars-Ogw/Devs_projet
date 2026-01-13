import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //préfixe global API
  app.setGlobalPrefix('api');

  //Validation stricte DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true ,//suppresion de champ inconnu
      forbidNonWhitelisted:true, // erreur si champ inconnu
      transform : true, // cast dto
    }),
  );

  //(postman/frontend)
  app.enableCors({
    origin:'*',
    methods:['GET','POST','PUT','PATCH','DELETE'],
    allowedHeaders:['Content-Type','Authorization'],
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log('API démarrée sur http://localhost:3000/api')

}
bootstrap();
