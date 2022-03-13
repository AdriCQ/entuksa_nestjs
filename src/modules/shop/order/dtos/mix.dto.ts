import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

/**
 * Shop order price details dto
 */
export class ShopOrderPriceDetails {
  @IsNumber()
  @ApiProperty()
  tax: number;
}

/**
 * @type IShopOrderStatus
 */
export type IShopOrderStatus = 'CREATED' | 'PROCESSING' | 'ACCEPTED' | 'READY' | 'C_CANCELED' | 'V_CANCELED' | 'ONWAY' | 'COMPLETED' | 'CLAIM' | 'CLAIM_COMPLETE';