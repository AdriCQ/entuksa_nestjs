import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopStore } from './store.model';
import { ShopStoreController } from './store.controller';
import { ShopStoreService } from './store.service';
import { PositionModule } from '@modules/map/position.module';
import { PositionsService } from '@modules/map/positions.service';
import { CaslModule } from '@modules/users/casl/casl.module';
import { PermissionFactory } from '@modules/users/casl/casl.factory';

@Module({
  imports: [TypeOrmModule.forFeature([ShopStore]), PositionModule, CaslModule],
  controllers: [ShopStoreController],
  providers: [ShopStoreService, PositionsService, PermissionFactory],
  exports: [ShopStoreService],
})
export class ShopStoreModule { }
