import { IsEmail, IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OnlyIdDto } from '@modules/base.dto';
/**
 * IUserRole
 */
export type IUserRole = "DEVELOPER" | "ADMIN" | "VENDOR" | "MODERATOR" | "DELIVER" | "CLIENT";
export type IUserJwtPayload = OnlyIdDto;
/**
 * -----------------------------------------
 *	UserAuthSignup
 * -----------------------------------------
 */
export class UserAuthSignup {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty({ example: 'myemail@email.com' })
  email: string;

  @IsOptional()
  @IsNumberString()
  @ApiProperty({ example: '55555555' })
  mobilePhone?: string;

  @IsString()
  @ApiProperty()
  password: string;
}

/**
 * -----------------------------------------
 *	User auth signin
 * -----------------------------------------
 */
export class UserAuthSignin {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ example: 'myemail@email.com' })
  email?: string;

  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({ example: '55555555' })
  mobilePhone?: string;

  @IsString()
  @ApiProperty()
  password: string;
}

/**
 * -----------------------------------------
 *	UserSendVerification
 * -----------------------------------------
 */
export class UserSendVerification {
  @IsIn(['EMAIL', 'MOBILE_PHONE'])
  @ApiProperty({ type: String, example: "'EMAIL' | 'MOBILE_PHONE'" })
  type: 'EMAIL' | 'MOBILE_PHONE';
}