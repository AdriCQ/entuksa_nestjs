import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopOrder } from './order.model';
import { OnlyIdDto } from '@modules/base.dto';
import { ShopOrderChangeStatusReqDto } from './order.dto';
/**
 * Shop order service
 */
@Injectable()
export class ShopOrderService {
  /**
   * Creates an instance of shop order service.
   * @param repo 
   */
  constructor(
    @InjectRepository(ShopOrder) private readonly repo: Repository<ShopOrder>
  ) { }
  /**
   * Changes status
   * @param { order: OnlyIdDto, client: User, status: IShopOrderStatus  } 
   * @returns Promise<ShopOrder>
   */
  async changeStatus(_p: ShopOrderChangeStatusReqDto): Promise<ShopOrder> {
    // findOrder
    const order = await this.repo.findOne(_p.order.id);
    if (!order)
      throw new HttpException('Orden no encontrada', 400);
    // const store = order.vendor;
    // TODO: Handle incomming message
    order.status = _p.status;
    this.repo.update(order.id, { status: _p.status });
    return order;
  }
  /**
   * Users orders
   * @param {user: OnlyIdDto} 
   * @returns orders 
   */
  async userOrders(_p: { user: OnlyIdDto }): Promise<ShopOrder[]> {
    return await this.repo.find({
      where: {
        client: { id: _p.user.id }
      }
    })
  }
}