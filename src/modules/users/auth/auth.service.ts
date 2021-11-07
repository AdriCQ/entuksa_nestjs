import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@modules/users/user.model';
import { IUser } from '@modules/users/users';
import { UsersService } from '@modules/users/users.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }
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
    else if (_user.mobilePhone)
      user = await this.usersService.find({ mobilePhone: _user.mobilePhone });
    if (!user) {
      throw new UnauthorizedException('No se encontró el usuario');
    }
    if (await user.validatePassword(_password)) return user;
    throw new UnauthorizedException('Credenciales incorrectas');
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
