import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
/**
 * Role
 */
export enum Role {
  DEVELOPER = 'DEVELOPER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  VENDOR = 'VENDOR',
  DELIVER = 'DELIVER',
  CLIENT = 'CLIENT',
}
/**
 * Decorator
 * @param roles
 * @returns
 */
export const ROLES_KEY = 'roles';
export const WithRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
/**
 * Roles guard
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
