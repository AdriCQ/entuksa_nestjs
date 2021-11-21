import { BaseModel } from "@modules/BaseModel";
import { User } from "@modules/users/user.model";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { ShopOffer } from '@modules/shop/offers/offer.model';
import { ShopOrderPriceDetailsDto, IShopOrderStatus } from './order.dto';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDecimal, IsIn, IsNumber, ValidateNested } from 'class-validator';
import { Type } from "class-transformer";
import { ShopOrderOffer } from './orderOffer.model';
import { ShopStore } from '../store/store.model';

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
   * Status  of shop order
   */
  @Column({ default: 'CREATED', type: 'varchar', length: '64' })
  @IsIn(['CREATED', 'PROCESSING', 'ACCEPTED', 'READY', 'C_CANCELED', 'V_CANCELED', 'ONWAY', 'COMPLETED', 'RECLAIM', 'RECLAIM_COMPLETE'])
  @ApiProperty({ example: "'CREATED' | 'PROCESSING' | 'ACCEPTED' | 'READY' | 'C_CANCELED' | 'V_CANCELED' | 'ONWAY' | 'COMPLETED' | 'RECLAIM' | 'RECLAIM_COMPLETE'" })
  status: IShopOrderStatus;
  /**
   * -----------------------------------------
   *	Relationships
   * -----------------------------------------
   */
  @ManyToOne(() => User, user => user.orders)
  @ApiPropertyOptional({ type: () => User })
  client?: User;
  /**
   * Offer  of shop order
   */
  @OneToMany(() => ShopOrderOffer, of => of.order)
  @ApiPropertyOptional({ type: () => ShopOrderOffer, isArray: true })
  orderOffers?: ShopOrderOffer[];
  /**
   * Vendor
   */
  @ManyToOne(() => ShopStore, store => store.orders)
  @ApiPropertyOptional({ type: () => ShopStore })
  vendor?: ShopStore;
}