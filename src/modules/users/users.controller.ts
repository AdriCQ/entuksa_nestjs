import { Body, Controller, Get, HttpCode, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserSendVerificationDto } from './users.dto';
import { User } from './user.model';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './auth/auth.guard';
import { MailService } from '@modules/notifications/mail/mail.service';
@ApiTags('User')
@Controller('api/users')
export class UsersController {
  /**
   * Creates an instance of users controller.
   * @param usersService
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly mailService: MailService
  ) { }
  /**
   * Send Verification
   * @param _body 
   * @param _req 
   */
  @UseGuards(JwtAuthGuard)
  @Post('/send-verification')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Boolean })
  async sendVerification(@Body() _body: UserSendVerificationDto, @Req() _req): Promise<boolean> {
    const user: User = _req.user;
    const token = this.usersService.generateConfirmationString(user, _body.type === 'MOBILE_PHONE' ? 'mobile' : 'email');
    if (_body.type === 'EMAIL') {
      await this.mailService.sendUserConfirmation(user, token);
      return true;
    }
    return false;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/verify/:type/:code')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Boolean, description: 'Validate user email/mobilePhone' })
  @ApiParam({ name: 'type', example: "'email' | 'mobile' " })
  @ApiParam({ name: 'code', type: Number })
  async verify(@Param('type') _type: 'email' | 'mobile', @Param('code') _code: string, @Req() req): Promise<boolean> {
    const user: User = req.user;
    if (_type !== 'email' && _type !== 'mobile')
      return false;
    if (isNaN(Number(_code)))
      return false;
    const validate = this.usersService.checkConfirmation(user, _type, _code);
    if (validate) {
      await this.usersService.verify(user, _type);
    }
    return validate;
  }
}
