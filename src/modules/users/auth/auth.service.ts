import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user.model';
import { IUser } from '../users';
import { UsersService } from '../users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  /**
   * Validates auth service
   * @param _user
   * @param _password
   * @returns validate
   */
  async validate(
    _user: { email?: string; mobilePhone?: string },
    _password: string,
  ): Promise<User | null> {
    let user: User;
    if (_user.email)
      user = await this.usersService.find({ email: _user.email });
    else if (!user && _user.mobilePhone)
      user = await this.usersService.find({ email: _user.email });
    if (!user) {
      throw new UnauthorizedException('No se encontró el usuario');
    }
    if (await user.validatePassword(_password)) return user;
    return null;
  }
  /**
   * Generates access token
   * @param name
   * @returns
   */
  async generateAccessToken(_user: User) {
    const user = await this.usersService.find({ email: _user.email });
    const payload: IUser.JwtPayload = { id: user.id };
    return this.jwtService.sign(payload);
  }
}
