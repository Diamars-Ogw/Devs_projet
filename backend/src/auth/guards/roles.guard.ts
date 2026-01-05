import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Récupérer les rôles définis via le décorateur @Roles
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si aucun rôle n'est spécifié, l'accès est autorisé par défaut
    if (!requiredRoles) {
      return true;
    }

    // 2. Récupérer l'utilisateur injecté par le JwtAuthGuard
    const { user } = context.switchToHttp().getRequest();

    // 3. Vérifier si le rôle de l'utilisateur correspond (ex: 'FORMATEUR')
    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException("Vous n'avez pas les permissions nécessaires (Requis: " + requiredRoles + ")");
    }

    return hasRole;
  }
}