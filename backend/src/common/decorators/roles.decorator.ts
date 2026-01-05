import { SetMetadata } from '@nestjs/common';

// Ce décorateur stocke les rôles autorisés dans les métadonnées de la route
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);