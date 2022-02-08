import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User, IUserJwtPayload, UsersService } from '@modules/users/users';
/**
 * JwtStrategy
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Creates an instance of jwt strategy.
   * @param usersService
   */
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.APP_KEY,
    });
  }
  /**
   * Validates jwt strategy
   * @param payload
   * @returns validate
   */
  async validate(payload: IUserJwtPayload): Promise<User> {
    if (typeof payload.id !== 'number') throw new UnauthorizedException();
    const user = await this.usersService.find({ id: payload.id });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
