import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from "./images.controller";
import { Image } from "./images.model";
import { ImageServices } from './images.service';
import { ImagesHelper } from './images.helper';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Image])],
  providers: [ImageServices, ConfigService],
  exports: [ImageServices, TypeOrmModule],
  controllers: [ImagesController]
})
export class ImagesModule {
  constructor() {
    ImagesHelper.createDir();
  }
}