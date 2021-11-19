import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Local
import { ShopOrder } from './order.model';
import { ShopOrderService } from './order.service';
import { ShopOrderOffer } from './orderOffer.model';
// Modules
import { ShopOffersModule } from '@modules/shop/offers/offers.module';


@Module({
  imports: [TypeOrmModule.forFeature([ShopOrder, ShopOrderOffer]), ShopOffersModule],
  providers: [ShopOrderService]
})
export class ShopOrderModule { }