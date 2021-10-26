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
  /**
   * Generates confirmation token
   * @param _user 
   * @returns confirmation token 
   */
  async generateConfirmationToken(_user: User): Promise<string> {
    const dateString = new Date().toLocaleDateString();
    const hashToken = await argon.hash(`${dateString}`);
    return `${_user.id}|${hashToken}`
  }
  /**
   * Gets user from confirmation token
   * @param _token 
   * @returns user
   */
  async getUserFromConfirmationToken(_token: string): Promise<User> {
    const tokenSplit = _token.split('|');
    if (!tokenSplit.length)
      throw new HttpException('Token incorrecto', 401);
    const userId = Number(tokenSplit[0]);
    const hash = tokenSplit[1]
    // Validate time
    const dateString = new Date().toLocaleDateString();
    if (await argon.verify(hash, dateString))
      return await this.usersService.find({ id: userId });
    else
      throw new HttpException('El Token ha caducado', 401);
  }
}
