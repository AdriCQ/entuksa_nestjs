import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
// Configuration
import { ConfigModule } from '@nestjs/config';
import appConfig from '@configs/app.config';
import mailConfig from '@configs/mail.config';
import pathConfig from '@configs/path.config';
import typeormConfig from '@configs/typeorm.config';
// Typeorm Database
import { DatabaseModuleConfig } from './database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// App Modules
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/users/auth/auth.module';
import { CaslModule } from '@modules/users/casl/casl.module';
import { ShopStoreModule } from '@modules/shop/store/store.module';
import { PositionModule } from '@modules/map/positions/position.module';
import { ImagesModule } from '@modules/images/images.module';
import { ShopOffersModule } from '@modules/shop/offers/offers.module';
import { ShopOrderModule } from '@modules/shop/order/order.module';
import { DbSeederModule } from '@modules/seeders/seeders.module';
import { CategoriesModule } from './modules/shop/categories/categories.module';
import { LocalityModule } from '@modules/map/localities/localities.module';
import { ApplicationModule } from './modules/applications/application.module';
import { LogModule } from '@modules/appLogs/logs.module';
// Notifications
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
    LogModule,
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
