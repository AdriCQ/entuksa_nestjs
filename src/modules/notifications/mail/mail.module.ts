import { Global, Module } from "@nestjs/common";
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from "path";
import { MailService } from './mail.service';
import { ConfigService } from "@nestjs/config";

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      // imports: [ConfigModule], // import module if not enabled globally
      useFactory: async (config: ConfigService) => ({
        // transport: config.get("MAIL_TRANSPORT"),
        // or
        transport: {
          host: config.get('mail.host'),
          port: config.get<number>('mail.port'),
          secure: true,
          auth: {
            user: config.get('mail.user'),
            pass: config.get('mail.password'),
          }
        },
        defaults: {
          from: `"Soporte Nairda" <${config.get('mail.from')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        preview: config.get<string>('app.env').toLocaleLowerCase() === 'dev',
        // options: {
        //   partials: {
        //     dir: join(__dirname, 'templates/partials'),
        //     options: {
        //       strict: true
        //     }
        //   }
        // }
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailNotificationModule { }