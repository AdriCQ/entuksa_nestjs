import {
  Body,
  ConflictException,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  Query
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthSigninDto, UserAuthSignupDto, } from '../users.dto';
import { UsersService } from '../users.service';
import { JwtAuthGuard } from './auth.guard';
import { UsersAuthResponseDto, User } from '../user.model';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MailService } from '@modules/notifications/mail/mail.service';

@ApiTags('User Auth')
@Controller('api/users/auth')
export class AuthController {
  /**
   * Creates an instance of auth controller.
   * @param authService
   * @param usersService
   * @param mailService
   */
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) { }
  /**
   * Confirms email
   */
  @Get('/confirm-email')
  async confirmEmail(@Query() _qry: { token: string }) {
    // TODO: Confirm email view
    return await this.authService.getUserFromConfirmationToken(_qry.token);
  }
  /**
   * Signins auth controller
   * @param _body
   * @returns signin
   */
  @Post('signin')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Login User', type: () => UsersAuthResponseDto })
  async signin(@Body() _body: UserAuthSigninDto): Promise<UsersAuthResponseDto> {
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
  @ApiResponse({ status: 201, description: 'Register User', type: () => UsersAuthResponseDto })
  async signup(@Body() _body: UserAuthSignupDto): Promise<UsersAuthResponseDto> {
    const exists = await this.usersService.exists({ email: _body.email, mobilePhone: _body.mobilePhone });
    if (exists)
      throw new ConflictException(`El email ${_body.email} o el teléfono ${_body.mobilePhone} ya están registrado`);
    // Send email confirmation
    const user = await this.usersService.create(_body);
    const confirmToken = await this.authService.generateConfirmationToken(user);
    this.mailService.sendUserConfirmation(user, confirmToken);
    const token = await this.authService.generateAccessToken(user);
    return { user, token };
  }
  /**
   * Profiles auth controller
   * @param req 
   * @returns  
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: () => User })
  profile(@Request() req) {
    return req.user;
  }
}
