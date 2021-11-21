import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModelWithImage } from '@modules/BaseModel';
import { IShopOffer } from './offers';
import { Image } from '@modules/images/images.model';
import { ShopStore } from '@modules/shop/store/store.model';
import { IsBoolean, IsDate, IsIn, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OfferAttributeDto, OfferPricesDto, OfferStockDto, OfferConfigurable, OfferConfigurableWithPrice } from './offers.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '@modules/shop/categories/category.model';
import { ShopOrderOffer } from '../order/orderOffer.model';
/**
 * Shop offer
 */
@Entity('shop_offers')
export class ShopOffer extends BaseModelWithImage {
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
  @Column({ type: 'json', nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OfferAttributeDto)
  @ApiProperty({ isArray: true, type: () => OfferAttributeDto })
  attributes: OfferAttributeDto[] | null;
  /**
   * Configurable  of shop offer
   */
  @Column({ type: 'json', nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OfferConfigurable)
  @ApiProperty({ isArray: true, type: () => OfferConfigurable, nullable: true })
  configurable: OfferConfigurable[] | null;
  /**
   * Configurable with price of shop offer
   */
  @Column({ type: 'json', nullable: true })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OfferConfigurableWithPrice)
  @ApiProperty({ isArray: true, type: () => OfferConfigurableWithPrice, nullable: true })
  configurableWithPrice: OfferConfigurableWithPrice[] | null;
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
  @Column({ type: 'timestamp', nullable: true, default: null })
  @IsOptional()
  @IsDate()
  @ApiProperty({ type: Date, nullable: true })
  validatedAt: Date | null;
  /**
   * -----------------------------------------
   *	Relationship
   * -----------------------------------------
   */
  /**
   * Category  of shop offer
   */
  @ManyToOne(() => Category, cat => cat.offers, { onDelete: 'CASCADE' })
  @ApiPropertyOptional({ type: () => Category })
  category?: Category;
  /**
   * image
   */
  @ManyToOne(() => Image, img => img.shopOffers)
  @ApiPropertyOptional({ type: () => Image })
  image?: Image;

  /**
   * Store  of shop offer
   */
  @ManyToOne(() => ShopStore, store => store.offers, { onDelete: 'CASCADE' })
  // @ApiPropertyOptional({ type: () => ShopStore, nullable: true })
  store?: ShopStore;
  /**
   * One to many of shop offer
   */
  @OneToMany(() => ShopOrderOffer, of => of.offer)
  // @ApiPropertyOptional({ type: () => ShopOrderOffer, isArray: true, nullable: true })
  orderOffers?: ShopOrderOffer[]
}