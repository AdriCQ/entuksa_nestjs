import { Locality } from '@modules/map/localities/locality.model';
import { MapCoordinate } from '@modules/map/positions/position.dto';
import { ShopOffer } from '@modules/shop/offers/offer.model';
import { ShopStore } from '@modules/shop/store/store.model';
import { User } from '@modules/users/user.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested, IsIn, IsNumber } from 'class-validator';
import { Application } from './application.model';
/**
 * @type Blocktype
 */
type BlockType = 'offer-widget' | 'offers-group' | 'offers-slider' | 'store-widget' | 'stores-group' | 'stores-slider' | 'title-widget';

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
  @IsBoolean()
  @ApiPropertyOptional()
  displayDense?: boolean;
  /**
   * displayOnly
   */
  @IsIn(['DESKTOP', 'MOBILE'])
  @ApiPropertyOptional()
  displayOnly?: 'DESKTOP' | 'MOBILE';
  /**
   * ratio
   */
  @IsNumber()
  @ApiPropertyOptional()
  ratio?: number;
  /**
   * Title  of client app block config dto
   */
  @IsString()
  @ApiPropertyOptional()
  title?: string;
}
/**
 * Client app blocks dto
 */
export class ClientBlocksDto {
  /**
   * Type  of client app blocks dto
   */
  @IsIn(['offer-widget', 'offers-group', 'offers-slider', 'store-widget', 'stores-group', 'stores-slider', 'title-widget'])
  @ApiProperty({ example: "'offer-widget' | 'offers-group' | 'offers-slider' | 'store-widget' | 'stores-group' | 'stores-slider' | 'title-widget'" })
  type: BlockType;
  /**
   * Config  of client app blocks dto
   */
  @ValidateNested()
  @Type(() => ClientAppBlockConfigDto)
  @ApiPropertyOptional({ type: () => ClientAppBlockConfigDto })
  config?: ClientAppBlockConfigDto;
  /**
   * Data  of client app block config dto
   */
  @ApiProperty({ example: "ShopOffer | ShopOffer[] | ShopStore | ShopStore[] | string" })
  data: ShopOffer | ShopOffer[] | ShopStore | ShopStore[] | string;
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
  @Type(() => ClientBlocksDto)
  @ApiProperty({ type: () => ClientBlocksDto, isArray: true })
  blocks: ClientBlocksDto[];
  /**
   * Locality  of setup client response
   */
  @ValidateNested()
  @Type(() => Locality)
  @ApiProperty({ type: () => Locality })
  locality: Locality;
}