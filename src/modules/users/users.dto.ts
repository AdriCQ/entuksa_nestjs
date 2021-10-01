import { IsEmail, IsString } from "class-validator";

export class UserAuthSignupDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
/**
 * User auth signin dto
 */
export class UserAuthSigninDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}