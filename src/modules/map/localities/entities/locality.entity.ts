import { Entity, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { BaseModel } from '@modules/BaseModel';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// Modules
import { MapPosition } from '@modules/map/positions';
import { ShopStore } from '@modules/shop/store/store.model';
/**
 * Locality
 */
@Entity('map_localities')
export class Locality extends BaseModel {
  /**
   * Title  of locality
   */
  @Column()
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Description  of locality
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
   * Parent  of locality
   */
  @ManyToOne(() => Locality, locality => locality.children)
  @ApiProperty({ type: () => Locality })
  parent: Locality;
  /**
   * Children  of locality
   */
  @OneToMany(() => Locality, locality => locality.parent)
  // @ApiProperty({ type: () => Locality, isArray: true })
  children: Locality[];
  /**
   * Position  of locality
   */
  @OneToOne(() => MapPosition)
  @JoinColumn()
  @ApiProperty({ type: () => MapPosition })
  position: MapPosition;
  /**
   * Shop stores of locality
   */
  @OneToMany(() => ShopStore, s => s.locality)
  // @ApiProperty({ type: () => ShopStore, isArray: true })
  shopStores: ShopStore[];
}