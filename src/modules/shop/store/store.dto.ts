import { IsObject, IsString } from "class-validator";
import { User } from '@modules/users/user.model';
/**
 * Store create dto
 */
export class StoreCreateDto {
  @IsString()
  title: string;
  /**
   * Description  of shop store
   */
  @IsString()
  description: string;
  /**
   * Vendor id of shop store
   */
  @IsObject()
  vendor: User;
}