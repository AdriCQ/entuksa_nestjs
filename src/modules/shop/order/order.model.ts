import { BaseModel } from "@modules/BaseModel";
import { User } from "@modules/users/user.model";
import { Entity, ManyToOne, OneToMany } from "typeorm";
import { ShopOrderOffer } from './order_offer.model';

@Entity('shop_orders')
export class ShopOrder extends BaseModel {
  /**
   * -----------------------------------------
   *	Relationships
   * -----------------------------------------
   */
  @ManyToOne(() => User, user => user.orders)
  client: User;

  @OneToMany(() => ShopOrderOffer, of => of.order)
  orderOffers: ShopOrderOffer[];
}