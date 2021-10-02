import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseModel } from '@modules/BaseModel';
import { IShopOffer } from './offers';
import { Image } from '@modules/images/images.model';
import { ShopStore } from '../store/store.model';
import { IsIn, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OfferAttributeDto, OfferPricesDto, OfferStockDto, OfferConfigurable, OfferConfigurableWithPrice } from './offers.dto';
import { ApiProperty } from '@nestjs/swagger';
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
  @Column({ type: 'varchar' })
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
}