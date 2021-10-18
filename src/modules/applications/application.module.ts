import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from './application.model';
import { ApplicationMiddleware } from './application.middleware';
import { ApplicationService } from "./application.service";
import { ApplicationController } from "./application.controller";
import { UsersModule } from "@modules/users/users.module";
import { ShopStoreModule } from "@modules/shop/store/store.module";
import { ShopOffersModule } from "@modules/shop/offers/offers.module";
import { CategoriesModule } from "@modules/shop/categories/categories.module";
import { LocalityModule } from "@modules/map/localities/localities.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Application]),
    UsersModule,
    CategoriesModule,
    ShopStoreModule,
    ShopOffersModule,
    LocalityModule
  ],
  controllers: [ApplicationController],
  providers: [
    ApplicationMiddleware,
    ApplicationService
  ],
  exports: [TypeOrmModule, ApplicationMiddleware, ApplicationService]
})
export class ApplicationModule { }