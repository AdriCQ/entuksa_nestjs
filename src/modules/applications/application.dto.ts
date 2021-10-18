import { Locality } from '@modules/map/localities/locality.model';
import { MapCoordinate } from '@modules/map/positions/position.dto';
import { ShopStore } from '@modules/shop/store/store.model';
import { User } from '@modules/users/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
/**
 * Application settings dto
 */
export class ApplicationSettingsDto {
  @IsBoolean()
  @ApiProperty()
  open: boolean;
}
/**
 * Create application dto
 */
export class CreateApplicationDto {
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Description  of application
   */
  @IsString()
  @ApiProperty()
  description: string;
  /**
   * Settings  of application
   */
  @ValidateNested()
  @Type(() => ApplicationSettingsDto)
  @ApiProperty({ type: () => ApplicationSettingsDto })
  settings: ApplicationSettingsDto;
}
/**
 * Setup client resquest
 */
export class SetupClientResquest {
  /**
   * User  of setup client response
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => User)
  @ApiProperty({ type: () => User })
  user?: User;
  /**
   * Coordinates  of setup client resquest
   */
  @ValidateNested()
  @Type(() => MapCoordinate)
  @ApiProperty({ type: () => MapCoordinate })
  coordinates: MapCoordinate;
}
/**
 * Setup client response
 */
export class SetupClientResponse {
  /**
   * User  of setup client response
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => User)
  @ApiProperty({ type: () => User })
  user?: User;
  /**
   * Stores  of setup client response
   */
  @IsArray()
  @ValidateNested()
  @Type(() => ShopStore)
  @ApiProperty({ type: () => ShopStore, isArray: true })
  stores: ShopStore[];
  /**
   * Locality  of setup client response
   */
  @ValidateNested()
  @Type(() => Locality)
  @ApiProperty({ type: () => Locality })
  locality: Locality;
}