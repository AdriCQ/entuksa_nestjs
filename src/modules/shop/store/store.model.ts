import { Column, Entity, ManyToOne } from "typeorm";
import { BaseModel } from '@modules/BaseModel';
import { IsNumber, IsString } from "class-validator";
import { StoreCreateDto } from './store.dto';
import { User } from '../../users/user.model';

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
   * Vendor id of shop store
   */
  @ManyToOne((type) => User, user => user.stores)
  vendor: User;
  /**
   * Rating  of shop store
   */
  @Column({ type: 'smallint', default: 0 })
  @IsNumber()
  rating: number;
}