import { BaseModel } from "@modules/BaseModel";
import { User } from "@modules/users/user.model";
import { Column, Entity, ManyToOne } from "typeorm";
import { ShopOffer } from '@modules/shop/offers/offer.model';
import { ShopOrderPriceDetailsDto, IShopOrderStatus } from './order.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsIn, IsNumber, ValidateNested } from 'class-validator';
import { Type } from "class-transformer";

@Entity('shop_orders')
export class ShopOrder extends BaseModel {
  /**
   * Price  of shop order
   */
  @Column({ type: 'decimal', precision: 8, scale: 2 })
  @IsDecimal({ decimal_digits: '2' })
  @ApiProperty({ example: 120.00 })
  price: number;
  /**
   * Price details of shop order
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => ShopOrderPriceDetailsDto)
  @ApiProperty({ type: () => ShopOrderPriceDetailsDto })
  priceDetails: ShopOrderPriceDetailsDto;
  /**
   * Qty  of shop order
   */
  @Column({ default: 0 })
  @IsNumber()
  @ApiProperty()
  qty: number;
  /**
   * Status  of shop order
   */
  @Column({ default: 'PROCESSING' })
  @IsIn(['PROCESSING', 'ACCEPTED', 'READY', 'C_CANCELED', 'V_CANCELED', 'ONWAY', 'COMPLETED', 'RECLAIM', 'RECLAIM_COMPLETE'])
  @ApiProperty({ example: "'PROCESSING' | 'ACCEPTED' | 'READY' | 'C_CANCELED' | 'V_CANCELED' | 'ONWAY' | 'COMPLETED' | 'RECLAIM' | 'RECLAIM_COMPLETE'" })
  status: IShopOrderStatus;
  /**
   * -----------------------------------------
   *	Relationships
   * -----------------------------------------
   */
  @ManyToOne(() => User, user => user.orders)
  @ApiProperty({ type: () => User })
  client: User;
  /**
   * Offer  of shop order
   */
  @ManyToOne(() => ShopOffer, offer => offer.orders)
  @ApiProperty({ type: () => ShopOffer })
  offer: ShopOffer;
  /**
   * -----------------------------------------
   *	Methods
   * -----------------------------------------
   */
  get vendor() {
    return this.offer.store;
  }
}