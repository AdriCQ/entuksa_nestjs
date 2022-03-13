import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

import { Application } from '../entities/application.entity';
import { AppClientBlocks } from './client.dto';

import { Locality } from '@modules/map/localities/locality.model';
import { MapCoordinate } from '@modules/map/positions/position.dto';
import { ShopStore } from '@modules/shop/store/store.model';
import { User } from '@modules/users/user.model';

/**
 * Setup client resquest
 */
export class SetupAppResquestDto {
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
  /**
   * App  of setup client resquest dto
   */
  @ValidateNested()
  @Type(() => Application)
  @ApiProperty({ type: () => Application })
  app: Application;
}
/**
 * Setup client response
 */
export class SetupAppResponseDto {
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
  @ValidateNested({ each: true })
  @Type(() => ShopStore)
  @ApiProperty({ type: () => ShopStore, isArray: true })
  stores: ShopStore[];
  /**
   * Blocks  of setup client response dto
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AppClientBlocks)
  @ApiProperty({ type: () => AppClientBlocks, isArray: true })
  blocks: AppClientBlocks[];
  /**
   * Locality  of setup client response
   */
  @ValidateNested()
  @Type(() => Locality)
  @ApiProperty({ type: () => Locality })
  locality: Locality;
}