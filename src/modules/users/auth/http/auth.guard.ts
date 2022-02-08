import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { User } from '@modules/users/users';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}


@Injectable()
export class AuthVerifiedGuard implements CanActivate {
  /**
   * Determines whether activate can
   * @param context 
   * @returns activate 
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.user && (req.user as User).emailVerifiedAt)
      return true;
    else {
      throw new UnauthorizedException();
    }
  }
}