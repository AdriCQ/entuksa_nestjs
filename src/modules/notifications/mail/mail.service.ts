import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@modules/users/user.model';
import { MailConfirmEmailDto } from './mail.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) { }
  /**
   * Sends user confirmation
   * @param user 
   * @param token 
   */
  async sendUserConfirmation(user: User, token: string) {
    const baseDomain = 'http://localhost:3000'
    const mailContext: MailConfirmEmailDto = {
      actionType: 'Confirmar Email',
      appTitle: 'Palrey',
      confirmUrl: `${baseDomain}/api/users/auth/confirm-email?token=${token}`,
      domain: baseDomain,
      unsuscribeUrl: `${baseDomain}/`,
      user
    }
    await this.mailerService.sendMail({
      to: user.email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: `Confirmacion de Correo - ${mailContext.appTitle}`,
      template: './email-confirmation', // `.hbs` extension is appended automatically
      context: mailContext,
    });
  }
}