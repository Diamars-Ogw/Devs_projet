import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { PromotionsModule } from './promotions/promotions.module';
import { SpacesModule } from './spaces/spaces.module';
import { EvaluationsModule } from './evaluations/evaluations.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/eduplatform.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true,
    }),
    AuthModule,
    UsersModule,
    PromotionsModule,
    SpacesModule,
    EvaluationsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}