import { User } from "@modules/users/user.model";
import { Type } from "class-transformer";
import { IsString, ValidateNested } from "class-validator";
/**
 * Mail base dto
 */
export class MailBaseDto {
  @IsString()
  actionType: string;
  /**
   * App title of mail base dto
   */
  @IsString()
  appTitle: string;
  /**
   * Domain  of mail base dto
   */
  @IsString()
  domain: string;
  /**
   * Unsuscribe url of mail base dto
   */
  @IsString()
  unsuscribeUrl: string;
  /**
   * User  of mail base dto
   */
  @ValidateNested()
  @Type(() => User)
  user: User;
}
/**
 * Mail confirm email dto
 */
export class MailConfirmEmailDto extends MailBaseDto {
  /**
   * Confirm url of mail confirm email dto
   */
  @IsString()
  confirmUrl: string;
}