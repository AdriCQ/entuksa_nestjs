import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ShopOrder } from './order.model';
// Modules
import { ShopOffer } from '@modules/shop/offers/offer.model';
/**
 * ShopOrderOffer
 */
@Entity('shop_order_offers')
export class ShopOrderOffer {
  /**
   * Id
   */
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty()
  id: number;
  /**
   * offer qty
   */
  @Column()
  @IsNumber()
  @ApiProperty()
  qty: number;
  /**
   * -----------------------------------------
   *	Relationships
   * -----------------------------------------
   */
  /**
   * Order Relationship
   */
  @ManyToOne(() => ShopOrder, order => order.orderOffers)
  @ApiProperty({ type: () => ShopOrder })
  order: ShopOrder;
  /**
   * Offer relationship
   */
  @ManyToOne(() => ShopOffer, of => of.orderOffers)
  @ApiProperty({ type: () => ShopOffer })
  offer: ShopOffer
}