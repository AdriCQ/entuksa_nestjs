import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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
  @IsEmail()
  @ApiProperty({ example: 'myemail@email.com' })
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}