import { Module } from '@nestjs/common';
import { Compte } from 'src/entities/compte.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Compte]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret_key',
      signOptions: { expiresIn: '24h' },
    }),
  ],
   controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[PassportModule,JwtModule]
  
})
export class AuthModule {}
