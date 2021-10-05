import { BaseModel } from "@modules/BaseModel";
import { Entity, ManyToOne, Column } from 'typeorm';
import { ShopOrder } from './order.model';
import { ShopOffer } from '@modules/shop/offers/offer.model';
import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
/**
 * Shpo order offer
 */
@Entity('shop_order_offers')
export class ShopOrderOffer extends BaseModel {
  /**
   * Order  of shop order offer
   */
  @ManyToOne(() => ShopOrder, order => order.orderOffers)
  @ApiProperty({ type: () => ShopOrder })
  order: ShopOrder;
  /**
   * Offer  of shop order offer
   */
  @ManyToOne(() => ShopOffer, offer => offer.orderOffers)
  @ApiProperty({ type: () => ShopOffer })
  offer: ShopOffer;
  /**
   * Qty  of shop order offer
   */
  @Column()
  @IsNumber()
  @ApiProperty()
  qty: number;
}