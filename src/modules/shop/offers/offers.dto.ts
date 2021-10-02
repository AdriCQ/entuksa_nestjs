import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsIn, IsNumber, IsString, ValidateNested } from "class-validator";
import { IShopOffer } from "./offers";
/**
 * Offer prices dto
 */
export class OfferPricesDto implements IShopOffer.Prices {
  @IsNumber()
  sell: number;
  @IsNumber()
  production: number;
  @IsNumber()
  vendor: number;
}
/**
 * Offer attribute dto
 */
export class OfferAttributeDto implements IShopOffer.Attribute {
  @IsString()
  name: string;
  @IsString()
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

  @ValidateNested()
  @Type(() => OfferAttributeDto)
  @ApiProperty({ type: () => OfferAttributeDto })
  values: OfferAttributeDto[];
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