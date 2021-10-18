import { ImagesModule } from '@modules/images/images.module';
import { LocalityModule } from '@modules/map/localities/localities.module';
import { CategoriesModule } from '@modules/shop/categories/categories.module';
import { ShopStoreModule } from '@modules/shop/store/store.module';
import { UsersModule } from '@modules/users/users.module';
import { Module } from '@nestjs/common';
import { DbSeederController } from './seeders.controller';
import { DbSeederService } from './seeders.service';
import { PositionModule } from '@modules/map/positions/position.module';
import { ApplicationModule } from '@modules/applications/application.module';
@Module({
  imports: [
    UsersModule,
    ImagesModule,
    CategoriesModule,
    LocalityModule,
    PositionModule,
    ShopStoreModule,
    ApplicationModule],
  controllers: [DbSeederController],
  providers: [
    DbSeederService,
  ]
})
export class DbSeederModule { }