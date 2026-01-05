import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Ajoute la logique personnalisée ici si nécessaire
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // Si une erreur survient ou si l'utilisateur n'existe pas, on bloque l'accès
    if (err || !user) {
      throw err || new UnauthorizedException("Vous devez être connecté pour accéder à cette ressource.");
    }
    return user;
  }
}