import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopStore } from './store.model';
import { ShopStoreController } from './store.controller';
import { ShopStoreService } from './store.service';
import { PositionModule } from '@modules/map/positions/position.module';
import { PositionsService } from '@modules/map/positions/positions.service';
import { CaslModule } from '@modules/users/casl/casl.module';
import { PermissionFactory } from '@modules/users/casl/casl.factory';
import { ImagesModule } from '@modules/images/images.module';
import { ImageServices } from '@modules/images/images.service';

@Module({
  imports: [TypeOrmModule.forFeature([ShopStore]), PositionModule, CaslModule, ImagesModule],
  controllers: [ShopStoreController],
  providers: [ShopStoreService, PositionsService, PermissionFactory, ImageServices],
  exports: [TypeOrmModule, ShopStoreService],
})
export class ShopStoreModule { }
