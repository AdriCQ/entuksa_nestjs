import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseModel } from '@modules/BaseModel';
import { IShopOffer } from './offers';
import { Image } from '@modules/images/images.model';
import { ShopStore } from '../store/store.model';
import { IsBoolean, IsDate, IsIn, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OfferAttributeDto, OfferPricesDto, OfferStockDto, OfferConfigurable, OfferConfigurableWithPrice } from './offers.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ShopOrderOffer } from '../order/order_offer.model';
/**
 * Shop offer
 */
@Entity('shop_offers')
export class ShopOffer extends BaseModel implements IShopOffer.Offer {
  /**
   * Title  of shop offer
   */
  @Column()
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Description  of shop offer
   */
  @Column()
  @IsString()
  @ApiProperty()
  description: string;
  /**
   * Prices  of shop offer
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => OfferPricesDto)
  @ApiProperty({ type: () => OfferPricesDto })
  prices: OfferPricesDto;
  /**
   * Stock  of shop offer
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => OfferStockDto)
  @ApiProperty({ type: () => OfferStockDto })
  stock: OfferStockDto;
  /**
   * Type  of shop offer
   */
  @Column({ type: 'varchar', comment: "'PRODUCT', 'SERVICE'" })
  @IsIn(['PRODUCT', 'SERVICE'])
  @ApiProperty({ example: "PRODUCT | SERVICE" })
  type: IShopOffer.Type;
  /**
   * Attributes  of shop offer
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => OfferAttributeDto)
  @ApiProperty({ isArray: true, type: () => OfferAttributeDto })
  attributes: OfferAttributeDto[];
  /**
   * Configurable  of shop offer
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => OfferConfigurable)
  @ApiProperty({ isArray: true, type: () => OfferConfigurable })
  configurable: OfferConfigurable[];
  /**
   * Configurable with price of shop offer
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => OfferConfigurableWithPrice)
  @ApiProperty({ isArray: true, type: () => OfferConfigurableWithPrice })
  configurableWithPrice: OfferConfigurableWithPrice[];
  /**
   * Rating  of shop offer
   */
  @Column({ type: 'smallint', default: 0 })
  @IsNumber()
  @ApiProperty()
  rating: number;
  /**
   * Onsale  of shop offer
   */
  @Column({ default: false })
  @IsBoolean()
  @ApiProperty()
  onsale: boolean;
  /**
   * Validated at of shop offer
   */
  @Column({ type: 'timestamp', nullable: true })
  @IsOptional()
  @IsDate()
  @ApiProperty()
  validatedAt: Date;

  /**
   * -----------------------------------------
   *	Relationship
   * -----------------------------------------
   */
  /**
  * Image  of shop offer
  */
  @OneToOne(() => Image, { eager: true })
  @JoinColumn()
  @ApiProperty({ type: () => Image })
  image: Image;
  /**
   * Store  of shop offer
   */
  @ManyToOne(() => ShopStore, store => store.offers, { cascade: ['remove'] })
  @ApiProperty({ type: () => ShopStore, nullable: true })
  store: ShopStore;
  /**
   * One to many of shop offer
   */
  @OneToMany(() => ShopOrderOffer, of => of.offer)
  @ApiProperty({ type: () => ShopOrderOffer, isArray: true, nullable: true })
  orderOffers: ShopOrderOffer[]
}