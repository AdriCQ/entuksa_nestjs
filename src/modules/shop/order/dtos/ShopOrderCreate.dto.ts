import { ShopStore } from '@modules/shop/store/store.model';
import { User } from '@modules/users/user.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { ShopOrderOfferInsert } from './ShopOrderOfferInsert.dto';
import { ShopOrderDeliver } from './ShopOrderDeliver.dto';

/**
 * ShopOrderCreateDto
 */
export class ShopOrderCreate {
  /**
   * Client
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => User)
  @ApiPropertyOptional({ type: () => User, nullable: true })
  client?: User;
  /**
   * deliver
   */
  @ValidateNested()
  @Type(() => ShopOrderDeliver)
  @ApiProperty({ type: () => ShopOrderDeliver })
  deliver: ShopOrderDeliver;
  /**
   * orderOffers
   */
  @ValidateNested({ each: true })
  @Type(() => ShopOrderOfferInsert)
  @ApiProperty({ type: () => ShopOrderOfferInsert, isArray: true })
  orderOffers: ShopOrderOfferInsert[];
  /**
   * Vendor
   */
  @ValidateNested()
  @Type(() => ShopStore)
  @ApiProperty({ type: () => ShopStore })
  vendor: ShopStore;
}