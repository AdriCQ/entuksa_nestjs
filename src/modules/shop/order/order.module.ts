import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOrder } from './order.model';

@Module({
  imports: [TypeOrmModule.forFeature([ShopOrder])]
})
export class ShopOrderModule { }