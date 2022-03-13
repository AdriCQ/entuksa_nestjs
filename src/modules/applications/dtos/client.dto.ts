import { ShopOffer } from '@modules/shop/offers/offer.model';
import { ShopStore } from '@modules/shop/store/store.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsIn, IsNumber, IsString, ValidateNested } from 'class-validator';
import { AppBlockType } from './mix.dto';

/**
 * -----------------------------------------
 *	AppClientBlockConfig
 * -----------------------------------------
 */
export class AppClientBlockConfig {
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
 * -----------------------------------------
 *	AppClientBlocks
 * -----------------------------------------
 */
export class AppClientBlocks {
  /**
   * Type  of client app blocks dto
   */
  @IsIn(['offer-widget', 'offers-group', 'offers-slider', 'store-widget', 'stores-group', 'stores-slider', 'title-widget'])
  @ApiProperty({ example: "'offer-widget' | 'offers-group' | 'offers-slider' | 'store-widget' | 'stores-group' | 'stores-slider' | 'title-widget'" })
  type: AppBlockType;
  /**
   * Config  of client app blocks dto
   */
  @ValidateNested()
  @Type(() => AppClientBlockConfig)
  @ApiPropertyOptional({ type: () => AppClientBlockConfig })
  config?: AppClientBlockConfig;
  /**
   * Data  of client app block config dto
   */
  @ApiProperty({ example: "ShopOffer | ShopOffer[] | ShopStore | ShopStore[] | string" })
  data: ShopOffer | ShopOffer[] | ShopStore | ShopStore[] | string;
}