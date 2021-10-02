import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseModel } from '@modules/BaseModel';
import { IShopOffer } from './offers';
import { Image } from '@modules/images/images.model';
import { ShopStore } from '../store/store.model';
import { IsIn, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OfferAttributeDto, OfferPricesDto, OfferStockDto, OfferConfigurable, OfferConfigurableWithPrice } from './offers.dto';
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
  title: string;
  /**
   * Description  of shop offer
   */
  @Column()
  @IsString()
  description: string;
  /**
   * Prices  of shop offer
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => OfferPricesDto)
  prices: IShopOffer.Prices;
  /**
   * Stock  of shop offer
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => OfferStockDto)
  stock: IShopOffer.Stock;
  /**
   * Type  of shop offer
   */
  @Column({ type: 'varchar' })
  @IsIn(['PRODUCT', 'SERVICE'])
  type: IShopOffer.Type;
  /**
   * Attributes  of shop offer
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => OfferAttributeDto)
  attributes: IShopOffer.Attribute[];
  /**
   * Configurable  of shop offer
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => OfferConfigurable)
  configurable: IShopOffer.Configurable[];
  /**
   * Configurable with price of shop offer
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => OfferConfigurableWithPrice)
  configurableWithPrice: IShopOffer.ConfigurableWithPrice[];
  /**
   * Rating  of shop offer
   */
  @Column({ type: 'smallint', default: 0 })
  @IsNumber()
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
  image: Image;
  /**
   * Store  of shop offer
   */
  @ManyToOne(() => ShopStore, store => store.offers, { cascade: ['remove'] })
  store: ShopStore;
}