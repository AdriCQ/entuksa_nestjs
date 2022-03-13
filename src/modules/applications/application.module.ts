import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from './entities/application.entity';
import { ApplicationMiddleware } from './application.middleware';
import { ApplicationService } from "./services/application.service";
import { ApplicationController } from "./application.controller";
import { UsersModule } from "@modules/users/users.module";
import { ShopStoreModule } from "@modules/shop/store/store.module";
import { ShopOffersModule } from "@modules/shop/offers/offers.module";
import { CategoriesModule } from "@modules/shop/categories/categories.module";
import { LocalityModule } from "@modules/map/localities";

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
export class ApplicationModule implements NestModule {
  configure(consummer: MiddlewareConsumer) {
    consummer.apply(ApplicationMiddleware).forRoutes(
      { path: '/application/setup', method: RequestMethod.ALL },
      { path: '/application/setup/**', method: RequestMethod.ALL },
      { path: '/api/**', method: RequestMethod.ALL }
    );
  }
}