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
    @InjectRepository(ShopOrderOffer) private readonly orderOfferRepo: Repository<ShopOrderOffer>,
    private readonly shopOfferService: OfferServices
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
   * checkAvailability
   * @param _offers 
   * @return price
   */
  async checkAvailability(_orderOffers: ShopOrderOffer[], _reduce = false): Promise<number> {
    let price = 0;
    _orderOffers.forEach(_of => {
      if (_of.offer.stock.status === 'SOLD_OUT' ||
        (_of.offer.stock.status === 'LIMITED' && _of.offer.stock.qty < _of.qty)
      )
        throw new HttpException('Inventario insuficiente', 400);
      price += _of.qty * _of.offer.prices.sell;
      if (_reduce) {
        this.shopOfferService.updateQty({
          offerId: _of.id,
          qty: _of.offer.stock.qty - 1
        });
      }
    });
    return price;
  }
  /**
   * create order
   * @param _params 
   */
  async create(_params: ShopOrderCreateDto): Promise<ShopOrder> {
    const priceDetails: ShopOrderPriceDetailsDto = {
      tax: 5
    };
    let price = priceDetails.tax;
    _params.orderOffers.forEach(_orderOffer => {
      // Check existence
      if (_orderOffer.offer.stock.status === 'SOLD_OUT' ||
        (_orderOffer.offer.stock.status === 'LIMITED' && _orderOffer.offer.stock.qty < _orderOffer.qty)
      )
        throw new HttpException('Inventario insuficiente', 400);
      price += _orderOffer.qty * _orderOffer.offer.prices.sell;
    });
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