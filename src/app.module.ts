import { Module } from '@nestjs/common';
// Configuration
import { ConfigModule } from '@nestjs/config';
import typeormConfig from './configs/typeorm.config';
// Typeorm Database
import { DatabaseModuleConfig } from './database';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Config Module
    ConfigModule.forRoot({
      load: [typeormConfig],
    }),
    // Load Typeorm
    DatabaseModuleConfig,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // App
}
