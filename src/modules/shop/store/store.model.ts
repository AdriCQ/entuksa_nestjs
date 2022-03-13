import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
// modules
import { BaseModelWithImage } from '@modules/BaseModel';
import { User } from '@modules/users/user.model';
import { Image } from '@modules/images/images.model';
import { Locality } from '@modules/map/localities/locality.model';
import { MapPosition } from '@modules/map/positions/position.model';
import { ShopOffer } from '@modules/shop/offers/offer.model';
import { ShopChat } from '@modules/shop/chat/chat.model';
import { ShopOrder } from '@modules/shop/order/order.model';
// Local
import { StoreTimingDto } from './store.dto';

/**
 * Shop store
 */
@Entity('shop_stores')
export class ShopStore extends BaseModelWithImage {
  /**
   * Title  of shop store
   */
  @Column()
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Description  of shop store
   */
  @Column()
  @IsString()
  @ApiProperty()
  description: string;
  /**
   * Open  of shop store
   */
  @Column({ default: false })
  @IsBoolean()
  @ApiProperty()
  open: boolean;
  /**
   * Rating  of shop store
   */
  @Column({ type: 'smallint', default: 0 })
  @IsNumber()
  @ApiProperty()
  rating: number;
  /**
   * Timing  of shop store
   */
  @Column({ type: 'json', nullable: true })
  @IsOptional()
  @ValidateNested()
  @Type(() => StoreTimingDto)
  @ApiProperty({ type: () => StoreTimingDto, nullable: true })
  timing: StoreTimingDto;
  /**
   * Validated at of shop store
   */
  @Column({ type: 'timestamp', nullable: true, default: null })
  @IsOptional()
  @IsDate()
  @ApiProperty({ type: Date, nullable: true })
  validatedAt: Date | null;
  /**
   * -----------------------------------------
   *	Relationships
   * -----------------------------------------
   */
  /**
   * Image  of shop store
   */
  @ManyToOne(() => Image, img => img.shopStores)
  @ApiPropertyOptional({ type: () => Image })
  image?: Image;
  /**
   * Locality  of shop store
   */
  @ManyToOne(() => Locality, l => l.shopStores, { onDelete: 'CASCADE', eager: true })
  @ApiPropertyOptional({ type: () => Locality })
  locality?: Locality;
  /**
   * -
   * Offers  of shop store
   */
  @OneToMany(() => ShopOffer, offer => offer.store)
  // @ApiPropertyOptional({ nullable: true, isArray: true, type: () => ShopOffer })
  offers?: ShopOffer[];
  /**
   * Shop Orders
   */
  @OneToMany(() => ShopOrder, order => order.vendor)
  // @ApiPropertyOptional({ nullable: true, isArray: true, type: () => ShopOrder })
  orders: ShopOrder[];
  /**
   * One to one of shop store
   */
  @ManyToOne(() => MapPosition, { eager: true })
  @ApiPropertyOptional({ type: () => MapPosition })
  position?: MapPosition;
  /**
   * Shop chats of store
   */
  @OneToMany(() => ShopChat, sc => sc.client)
  // @ApiPropertyOptional({ type: () => ShopChat, isArray: true })
  shopChats?: ShopChat[];
  /**
   * Vendor of shop store
   */
  @ManyToOne(() => User, (user) => user.stores)
  @ApiPropertyOptional({ nullable: true, type: () => User })
  vendor?: User;
}
