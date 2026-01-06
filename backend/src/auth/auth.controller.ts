import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const result = await this.authService.login(body.email, body.password);
    
    if (!result) {
      return {
        success: false,
        message: 'Email ou mot de passe incorrect',
      };
    }

    return {
      success: true,
      data: result,
    };
  }

  @Post('logout')
  async logout() {
    return {
      success: true,
      message: 'Déconnexion réussie',
    };
  }
}