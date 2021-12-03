import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// Local
import { ShopOrder } from './order.model';
import { ShopOrderOffer } from './orderOffer.model';
import { ShopOrderChangeStatusReqDto, ShopOrderCreateDto, ShopOrderPriceDetailsDto } from './order.dto';
// modules
import { OnlyIdDto } from '@modules/base.dto';
import { OfferServices } from '@modules/shop/offers/offers.service';
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
    @InjectRepository(ShopOrder) private readonly repo: Repository<ShopOrder>,
    // @InjectRepository(ShopOrderOffer) private readonly $orderOfferRepo: Repository<ShopOrderOffer>,
    private readonly $offerService: OfferServices
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
   * create order
   * @param _params 
   */
  async create(_params: ShopOrderCreateDto): Promise<ShopOrder> {
    const { price, priceDetails } = await this.getPrice(_params.orderOffers, true);
    const order = this.repo.create({
      client: _params.client,
      vendor: _params.vendor,
      price,
      priceDetails,
      status: 'CREATED'
    });
    order.orderOffers = _params.orderOffers;
    return await this.repo.save(order);
  }
  /**
   * delete
   * @param _offerId 
   * @returns 
   */
  async delete(_offerId: number) {
    return this.repo.delete(_offerId);
  }
  /**
   * getPrice
   * @param _offers 
   * @return price
   */
  async getPrice(_orderOffers: ShopOrderOffer[], _reduce = false) {
    const priceDetails: ShopOrderPriceDetailsDto = {
      tax: 5
    };
    let price = priceDetails.tax;
    _orderOffers.forEach(async (_of) => {
      const offer = await this.$offerService.findAndCheckAvailability({
        id: _of.id, qty: _of.qty, reduce: _reduce
      });
      if (!offer)
        throw new HttpException('Oferta no disponible', 400);
      price += offer.prices.sell;
    });
    return { price, priceDetails }
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