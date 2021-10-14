import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseModel } from '@modules/BaseModel';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { StoreCreateDto, StoreTimingDto } from './store.dto';
import { User } from '@modules/users/user.model';
import { MapPosition } from '@modules/map/positions/position.model';
import { ShopOffer } from '../offers/offer.model';
import { Image } from '@modules/images/images.model';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

/**
 * Shop store
 */
@Entity('shop_stores')
export class ShopStore extends BaseModel {
  /**
   * Creates an instance of shop store.
   * @param [store]
   */
  constructor(store?: StoreCreateDto) {
    super();
    if (store) {
      this.title = store.title;
      this.description = store.description;
      this.position = store.position;
      this.rating = 0;
      this.image.id = 1;
    }
  }
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
   * -----------------------------------------
   *	Relationships
   * -----------------------------------------
   */
  /**
   * Image  of shop store
   */
  @OneToOne(() => Image, { eager: true })
  @JoinColumn()
  @ApiProperty({ type: () => Image })
  image: Image;
  /**
   * -
   * Offers  of shop store
   */
  @OneToMany(() => ShopOffer, offer => offer.store)
  @ApiProperty({ nullable: true, isArray: true, type: () => ShopOffer })
  offers: ShopOffer[];
  /**
   * One to one of shop store
   */
  @OneToOne(() => MapPosition, { eager: true })
  @JoinColumn()
  @ApiProperty({ type: () => MapPosition })
  position: MapPosition;
  /**
   * Vendor of shop store
   */
  @ManyToOne(() => User, (user) => user.stores)
  @ApiProperty({ nullable: true, type: () => User })
  vendor: User;
}
