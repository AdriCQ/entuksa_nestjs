import { Module } from '@nestjs/common';
// Configuration
import { ConfigModule } from '@nestjs/config';
import appConfig from './configs/app.config';
import typeormConfig from './configs/typeorm.config';
// Typeorm Database
import { DatabaseModuleConfig } from './database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// App Modules
import { UsersModule } from '@modules/users/users.module';
import { AuthModule } from '@modules/users/auth/auth.module';
import { CaslModule } from '@modules/users/casl/casl.module';
import { ShopStoreModule } from '@modules/shop/store/store.module';
import { PositionModule } from '@modules/map/position.module';
import { ImagesModule } from '@modules/images/images.module';

@Module({
  imports: [
    // Config Module
    ConfigModule.forRoot({
      load: [appConfig, typeormConfig],
      isGlobal: true,
    }),
    // Load Typeorm
    DatabaseModuleConfig,
    // User Modules
    UsersModule,
    AuthModule,
    CaslModule,
    // Image
    ImagesModule,
    // Shop Modules
    ShopStoreModule,
    // Map Modules
    PositionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // App
}
