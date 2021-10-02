import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopStore } from './store.model';
import { ShopStoreController } from './store.controller';
import { ShopStoreService } from './store.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShopStore])],
  controllers: [ShopStoreController],
  providers: [ShopStoreService],
  exports: [ShopStoreService],
})
export class ShopStoreModule { }
