import { IsObject, IsString, ValidateNested } from 'class-validator';
import { User } from '@modules/users/user.model';
import { Type } from 'class-transformer';
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
  @ValidateNested()
  @Type(() => User)
  vendor: User;
}
