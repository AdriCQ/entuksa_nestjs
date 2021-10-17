import { ImagesModule } from '@modules/images/images.module';
import { ImageServices } from '@modules/images/images.service';
import { LocalityModule } from '@modules/map/localities/localities.module';
import { LocalityService } from '@modules/map/localities/locality.service';
import { CategoriesModule } from '@modules/shop/categories/categories.module';
import { CategoriesService } from '@modules/shop/categories/categories.service';
import { ShopStoreModule } from '@modules/shop/store/store.module';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@modules/users/users.service';
import { Module } from '@nestjs/common';
import { DbSeederController } from './seeders.controller';
import { DbSeederService } from './seeders.service';
import { ShopStoreService } from '../shop/store/store.service';
import { PositionModule } from '@modules/map/positions/position.module';
import { PositionsService } from '@modules/map/positions/positions.service';
import { ApplicationModule } from '@modules/applications/application.module';
import { ApplicationService } from '@modules/applications/application.service';
@Module({
  imports: [UsersModule, ImagesModule, CategoriesModule, LocalityModule, PositionModule, ShopStoreModule, ApplicationModule],
  controllers: [DbSeederController],
  providers: [DbSeederService, UsersService, ImageServices, CategoriesService, LocalityService, PositionsService, ShopStoreService, ApplicationService]
})
export class DbSeederModule { }