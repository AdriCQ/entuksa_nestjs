import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOrderOffer } from './order_offer.model';
import { ShopOrder } from './order.model';

@Module({
  imports: [TypeOrmModule.forFeature([ShopOrder, ShopOrderOffer])]
})
export class ShopOrderModule { }