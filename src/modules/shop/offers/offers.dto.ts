import { OnlyIdDto, OnlyIdStringDto } from "@modules/base.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { ShopStore } from '../store/store.model';
import { IShopOffer } from "./offers";
/**
 * Offer prices dto
 */
export class OfferPricesDto implements IShopOffer.Prices {
  @IsNumber()
  @ApiProperty()
  sell: number;
  @IsNumber()
  @ApiProperty()
  production: number;
  @IsNumber()
  @ApiProperty()
  vendor: number;
}
/**
 * Offer attribute dto
 */
export class OfferAttributeDto implements IShopOffer.Attribute {
  @IsString()
  @ApiProperty()
  name: string;
  @IsString()
  @ApiProperty()
  value: string | number;
}
/**
 * Offer configurable
 */
export class OfferConfigurable implements IShopOffer.Configurable {
  @IsString()
  @ApiProperty()
  name: string;
  @IsArray()
  @ApiProperty({ isArray: true })
  values: string[];
}
/**
 * Offer configurable with price
 */
export class OfferConfigurableWithPrice implements IShopOffer.ConfigurableWithPrice {
  @IsString()
  @ApiProperty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => OfferAttributeDto)
  @ApiProperty({ type: () => OfferAttributeDto })
  values: OfferAttributeDto[];
}
/**
 * Offer filter request
 */
export class OfferFilterRequest {
  @IsOptional()
  @IsString()
  @ApiProperty()
  title?: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  maxPrice?: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  rating?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ShopStore)
  @ApiProperty({ type: () => ShopStore })
  store?: ShopStore;
}
/**
 * Offer stock dto
 */
export class OfferStockDto implements IShopOffer.Stock {
  @IsIn(['INFINITY', 'SOLD_OUT', 'LIMITED'])
  @ApiProperty({ example: "['INFINITY', 'SOLD_OUT', 'LIMITED']" })
  status: IShopOffer.StockStatus;
  @IsNumber()
  @ApiProperty()
  qty: number;
}
/**
 * Create shop offer dto
 */
export class CreateShopOfferDto {
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OnlyIdDto)
  @ApiProperty({ type: () => OnlyIdDto })
  store: OnlyIdDto;
  /**
   * Title  of shop offer
   */
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Description  of shop offer
   */
  @IsString()
  @ApiProperty()
  description: string;
  /**
   * Prices  of shop offer
   */
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OfferPricesDto)
  @ApiProperty({ type: () => OfferPricesDto })
  prices: OfferPricesDto;
  /**
   * Stock  of shop offer
   */
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OfferStockDto)
  @ApiProperty({ type: () => OfferStockDto })
  stock: OfferStockDto;
  /**
   * Type  of shop offer
   */
  @IsIn(['PRODUCT', 'SERVICE'])
  @ApiProperty({ example: "PRODUCT | SERVICE" })
  type: IShopOffer.Type;
  /**
   * Attributes  of shop offer
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OfferAttributeDto)
  @ApiProperty({ isArray: true, type: () => OfferAttributeDto })
  attributes: OfferAttributeDto[] | null;
  /**
   * Category  of create shop offer dto
   */
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OnlyIdDto)
  @ApiProperty({ type: () => OnlyIdDto })
  category: OnlyIdStringDto;
  /**
   * Image  of create shop offer dto
   */
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => OnlyIdDto)
  @ApiProperty({ type: () => OnlyIdDto })
  image: OnlyIdDto;
}
export class UpdateShopOfferDto {
  /**
   * Title  of shop offer
   */
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  title?: string;
  /**
   * Description  of shop offer
   */
  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  description?: string;
  /**
   * Prices  of shop offer
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => OfferPricesDto)
  @ApiPropertyOptional({ type: () => OfferPricesDto })
  prices?: OfferPricesDto;
  /**
   * Stock  of shop offer
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => OfferStockDto)
  @ApiPropertyOptional({ type: () => OfferStockDto })
  stock?: OfferStockDto;
  /**
   * Type  of shop offer
   */
  @IsOptional()
  @IsIn(['PRODUCT', 'SERVICE'])
  @ApiPropertyOptional({ example: "PRODUCT | SERVICE" })
  type?: IShopOffer.Type;
  /**
   * Attributes  of shop offer
   */
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OfferAttributeDto)
  @ApiPropertyOptional({ isArray: true, type: () => OfferAttributeDto })
  attributes?: OfferAttributeDto[] | null;
  /**
   * Category  of create shop offer dto
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => OnlyIdDto)
  @ApiPropertyOptional({ type: () => OnlyIdDto })
  category?: OnlyIdStringDto;
  /**
   * Image  of create shop offer dto
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => OnlyIdDto)
  @ApiPropertyOptional({ type: () => OnlyIdDto })
  image?: OnlyIdDto;
}