import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users.module';
import { AuthController } from './auth.controller';
// import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Global()
@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      // imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('app.key'),
        // signOptions: {
        //   expiresIn: 0
        // },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule { }
