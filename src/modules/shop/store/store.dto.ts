import { IsString, ValidateNested, IsBoolean, IsOptional } from 'class-validator';
import { User } from '@modules/users/user.model';
import { Type } from 'class-transformer';
import { MapPosition } from '@modules/map/positions/position.model';
import { ApiProperty } from '@nestjs/swagger';
import { Locality } from '@modules/map/localities/locality.model';
import { Image } from '@modules/images/images.model';
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
  /**
   * Locality  of store create dto
   */
  @ValidateNested()
  @Type(() => Locality)
  @ApiProperty({ type: () => Locality })
  locality: Locality;
  /**
   * Image  of store create dto
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => Image)
  @ApiProperty({ type: () => Image, nullable: true })
  image?: Image;
}
/**
 * Store timing dto
 */
export class StoreTimingDto {
  @IsString()
  @ApiProperty({ example: '0900' })
  open: string;
  @IsString()
  @ApiProperty({ example: '0900' })
  close: string;
  @IsBoolean()
  @ApiProperty()
  auto: boolean;
}