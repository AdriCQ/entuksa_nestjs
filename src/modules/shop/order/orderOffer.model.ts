import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
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
  @OneToMany(() => ShopOrder, order => order.orderOffers)
  @ValidateNested()
  @Type(() => ShopOrder)
  @ApiProperty({ type: () => ShopOrder })
  order: ShopOrder;
  /**
   * Offer relationship
   */
  @OneToMany(() => ShopOffer, of => of.orderOffers)
  @ValidateNested()
  @Type(() => ShopOffer)
  @ApiProperty({ type: () => ShopOffer })
  offer: ShopOffer
}