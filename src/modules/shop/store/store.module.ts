import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopStore } from './store.model';
import { ShopStoreController } from './store.controller';
import { ShopStoreService } from './store.service';
import { PositionModule } from '@modules/map/position.module';
import { PositionsService } from '@modules/map/positions.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShopStore]), PositionModule],
  controllers: [ShopStoreController],
  providers: [ShopStoreService, PositionsService],
  exports: [ShopStoreService],
})
export class ShopStoreModule { }
