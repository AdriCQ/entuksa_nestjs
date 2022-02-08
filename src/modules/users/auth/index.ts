import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
// Local
import { AuthController } from './http/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './helpers/jwt.strategy';
// Modules
import { UsersModule } from '@modules/users/users';

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
export class AuthModule {}


export * from './http/auth.guard';
export * from './services/auth.service';