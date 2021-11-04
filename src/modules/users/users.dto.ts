import { IsEmail, IsIn, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
/**
 * User auth signup dto
 */
export class UserAuthSignupDto {
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
 * User auth signin dto
 */
export class UserAuthSigninDto {
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
 * UserSendVerificationDto
 */
export class UserSendVerificationDto {
  @IsIn(['EMAIL', 'MOBILE_PHONE'])
  @ApiProperty({ type: String, example: "'EMAIL' | 'MOBILE_PHONE'" })
  type: 'EMAIL' | 'MOBILE_PHONE';
}