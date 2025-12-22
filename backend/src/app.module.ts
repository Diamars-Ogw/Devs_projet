import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromotionsModule } from './promotions/promotions.module';

@Module({
  imports: [
    // Configuration globale
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Configuration TypeORM avec SQLite
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DATABASE_PATH || './database/eduplatform.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
      logging: process.env.DATABASE_LOGGING === 'true',
    }),

    // Modules fonctionnels (à ajouter au fur et à mesure)
    // AuthModule,
    // UsersModule,
    PromotionsModule,
    // SpacesModule,
    // WorksModule,
    // SubmissionsModule,
    // EvaluationsModule,
    // EmailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
