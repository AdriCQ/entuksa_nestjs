import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { ShopOffer } from '@modules/shop/offers/offer.model';
/**
 * Category
 */
@Entity('shop_categories')
export class Category {
  /**
   * Tag  of category
   */
  @PrimaryColumn()
  @IsString()
  @ApiProperty()
  id: string;
  /**
   * Title  of category
   */
  @Column()
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Description  of category
   */
  @Column()
  @IsString()
  @ApiProperty()
  description: string;
  /**
   * Icon  of category
   */
  @Column()
  @IsString()
  @ApiProperty()
  icon: string;
  /**
   * -----------------------------------------
   *	Relationships
   * -----------------------------------------
   */
  /**
   * Children  of category
   */
  @OneToMany(() => Category, cat => cat.parent)
  @ApiProperty({ type: () => Category, isArray: true })
  children: Category[];
  /**
   * Parent  of category
   */
  @ManyToOne(() => Category, cat => cat.children, { onDelete: 'CASCADE' })
  @ApiProperty({ type: () => Category })
  parent: Category;
  /**
   * Offers  of category
   */
  @OneToMany(() => ShopOffer, offer => offer.category)
  // @ApiPropertyOptional({ type: ShopOffer, isArray: true })
  offers: ShopOffer[]
}