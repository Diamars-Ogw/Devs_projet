import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Compte } from '../users/entities/compte.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compte]),
    JwtModule.register({
      secret: 'your-secret-key', // ⚠️ À mettre dans .env en production
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}