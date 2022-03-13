import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Configuration
import { ConfigModule } from '@nestjs/config';
import appConfig from '@configs/app.config';
import mailConfig from '@configs/mail.config';
import pathConfig from '@configs/path.config';
import typeormConfig from '@configs/typeorm.config';
// Typeorm Database
import { DatabaseModuleConfig } from './modules/database';
import { DbSeederModule } from '@modules/database/seeders/seeders.module';
// Users Modules
import { UsersModule } from '@modules/users/users';
import { AuthModule } from '@modules/users/auth';
import { CaslModule } from '@modules/users/casl';
// Shop module
import { ShopStoreModule } from '@modules/shop/store/store.module';
import { ImagesModule } from '@modules/images';
import { ShopOffersModule } from '@modules/shop/offers/offers.module';
import { ShopOrderModule } from '@modules/shop/order/order.module';
import { CategoriesModule } from '@modules/shop/categories/categories.module';
import { ShopChatModule } from '@modules/shop/chat/chat.module';
// Map Modules
import { LocalityModule } from '@modules/map/localities';
import { PositionModule } from '@modules/map/positions';
// App modules
import { ApplicationModule } from '@modules/applications/application.module';
import { MailNotificationModule } from '@modules/notifications/mail/mail.module';

@Module({
  imports: [
    // Load Multer
    MulterModule.register({
      dest: './storage'
    }),
    // Config Module
    ConfigModule.forRoot({
      load: [appConfig, mailConfig, pathConfig, typeormConfig],
      isGlobal: true,
    }),
    // Load Typeorm
    DatabaseModuleConfig,
    DbSeederModule,
    ApplicationModule,
    // User Modules
    UsersModule,
    AuthModule,
    CaslModule,
    // Image
    ImagesModule,
    // Shop Modules
    CategoriesModule,
    ShopStoreModule,
    ShopOffersModule,
    ShopOrderModule,
    ShopChatModule,
    // Map Modules
    PositionModule,
    LocalityModule,
    // Notifications
    MailNotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
