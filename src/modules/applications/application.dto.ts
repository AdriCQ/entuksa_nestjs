import { Locality } from '@modules/map/localities/locality.model';
import { MapCoordinate } from '@modules/map/positions/position.dto';
import { ShopOffer } from '@modules/shop/offers/offer.model';
import { ShopStore } from '@modules/shop/store/store.model';
import { User } from '@modules/users/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Application } from './application.model';
/**
 * Application settings dto
 */
export class ApplicationSettingsDto {
  @IsBoolean()
  @ApiProperty()
  open: boolean;
}
/**
 * Client app block config dto
 */
export class ClientAppBlockConfigDto {
  /**
   * Data  of client app block config dto
   */
  data: ShopOffer | ShopOffer[] | ShopStore | ShopStore[];
}
/**
 * Client app blocks dto
 */
export class ClientAppBlocksDto {
  /**
   * Title  of client app blocks dto
   */
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Config  of client app blocks dto
   */
  @ValidateNested()
  @Type(() => ClientAppBlockConfigDto)
  @ApiProperty({ type: () => ClientAppBlockConfigDto })
  config: ClientAppBlockConfigDto;
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
export class SetupClientResquestDto {
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
export class SetupClientResponseDto {
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
  @Type(() => ClientAppBlocksDto)
  @ApiProperty({ type: () => ClientAppBlocksDto, isArray: true })
  blocks: ClientAppBlocksDto[];
  /**
   * Locality  of setup client response
   */
  @ValidateNested()
  @Type(() => Locality)
  @ApiProperty({ type: () => Locality })
  locality: Locality;
}