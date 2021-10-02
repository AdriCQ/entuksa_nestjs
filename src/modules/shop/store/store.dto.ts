import { IsString, ValidateNested } from 'class-validator';
import { User } from '@modules/users/user.model';
import { Type } from 'class-transformer';
import { MapPosition } from '@modules/map/position.model';
import { ApiProperty } from '@nestjs/swagger';
/**
 * Store create dto
 */
export class StoreCreateDto {
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Description  of shop store
   */
  @IsString()
  @ApiProperty()
  description: string;
  /**
   * Vendor id of shop store
   */
  @ValidateNested()
  @Type(() => User)
  @ApiProperty({ type: () => User })
  vendor: User;

  @ValidateNested()
  @Type(() => MapPosition)
  @ApiProperty({ type: () => MapPosition })
  position: MapPosition;
}
