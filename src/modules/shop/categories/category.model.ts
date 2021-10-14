import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
/**
 * Category
 */
@Entity('shop_categories')
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
  /**
   * Tag  of category
   */
  @Column({ type: 'varchar', unique: true })
  @IsString()
  @ApiProperty()
  tag: string;
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
  @ManyToOne(() => Category, cat => cat.children)
  @ApiProperty({ type: () => Category })
  parent: Category;
}