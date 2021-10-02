import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthSigninDto, UserAuthSignupDto } from '../users.dto';
import { IUser } from '../users';
import { UsersService } from '../users.service';
import { JwtAuthGuard } from './auth.guard';

@Controller('api/users/auth')
export class AuthController {
  /**
   * Creates an instance of auth controller.
   * @param authService
   * @param usersService
   */
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }

  /**
   * Signins auth controller
   * @param _body
   * @returns signin
   */
  @Post('signin')
  @HttpCode(200)
  async signin(@Body() _body: UserAuthSigninDto): Promise<IUser.ResponseAuth> {
    // validate
    const user = await this.authService.validate(
      {
        email: _body.email,
      },
      _body.password,
    );
    if (user) {
      const token = await this.authService.generateAccessToken(user);
      return {
        token,
        user,
      };
    }
  }
  /**
   * Signups auth controller
   * @param _body
   * @returns signup
   */
  @Post('signup')
  async signup(@Body() _body: UserAuthSignupDto): Promise<IUser.ResponseAuth> {
    const exists = await this.usersService.exists({ email: _body.email });
    if (exists)
      throw new ConflictException(`El email ${_body.email} ya está registrado`);
    const user = await this.usersService.create(_body);
    const token = await this.authService.generateAccessToken(user);
    return { user, token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  proofile(@Request() req) {
    return req.user;
  }
}
