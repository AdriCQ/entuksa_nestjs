import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { BaseModel } from '@modules/BaseModel';
import { IsNumber, IsString } from 'class-validator';
import { StoreCreateDto } from './store.dto';
import { User } from '@modules/users/user.model';
import { MapPosition } from '@modules/map/position.model';

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
      this.vendor = store.vendor;
      this.position = store.position;
      this.rating = 0;
    }
  }
  /**
   * Title  of shop store
   */
  @Column()
  @IsString()
  title: string;
  /**
   * Description  of shop store
   */
  @Column()
  @IsString()
  description: string;
  /**
   * Rating  of shop store
   */
  @Column({ type: 'smallint', default: 0 })
  @IsNumber()
  rating: number;
  /**
   * -----------------------------------------
   *	Relationships
   * -----------------------------------------
  /**
   * One to one of shop store
   */
  @OneToOne(() => MapPosition, { eager: true })
  @JoinColumn()
  position: MapPosition;
  /**
   * Vendor of shop store
   */
  @ManyToOne(() => User, (user) => user.stores)
  vendor: User;
}
