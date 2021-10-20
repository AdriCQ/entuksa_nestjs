import { BaseModel } from "@modules/BaseModel";
import { User } from "@modules/users/user.model";
import { Column, Entity, ManyToOne } from "typeorm";
import { ShopOffer } from '@modules/shop/offers/offer.model';
import { ShopOrderPriceDetailsDto } from './order.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNumber, ValidateNested } from 'class-validator';
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
}