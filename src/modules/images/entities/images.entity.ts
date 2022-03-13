import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// Local
import { ImagePaths } from '../dtos';
// modules
import { User } from '@modules/users/users';
import { ShopStore } from '@modules/shop/store/store.model';
import { ShopOffer } from '@modules/shop/offers/offer.model';
/**
 * Image
 */
@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
  /**
   * Title  of image
   */
  @Column()
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Tags  of image
   */
  @Column({ type: 'json', nullable: true })
  @IsArray()
  @ApiProperty({ isArray: true })
  tags: string[];
  /**
   * Paths  of image
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => ImagePaths)
  @ApiProperty()
  paths: ImagePaths;
  /**
   * Owner  of image
   */
  @ManyToOne(() => User, user => user.images, { cascade: true, nullable: true })
  @ApiPropertyOptional({ type: () => User })
  owner?: User;
  /**
   * -----------------------------------------
   *	Relationship
   * -----------------------------------------
   */
  @OneToMany(() => ShopStore, sh => sh.image)
  shopStores?: ShopStore[];

  @OneToMany(() => ShopOffer, sh => sh.image)
  shopOffers?: ShopOffer[];
}