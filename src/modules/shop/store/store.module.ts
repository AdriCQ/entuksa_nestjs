import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopStore } from './store.model';
import { ShopStoreController } from './store.controller';
import { ShopStoreService } from './store.service';
import { PositionModule } from '@modules/map/positions/position.module';
import { CaslModule } from '@modules/users/casl/casl.module';
import { ImagesModule } from '@modules/images/images.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShopStore]), PositionModule, CaslModule, ImagesModule],
  controllers: [ShopStoreController],
  providers: [ShopStoreService],
  exports: [TypeOrmModule, ShopStoreService],
})
export class ShopStoreModule { }
