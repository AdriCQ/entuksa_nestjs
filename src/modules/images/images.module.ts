import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from "./images.controller";
import { Image } from "./images.model";
import { ImageServices } from './images.service';
import { ImagesHelper } from './images.helper';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Image]),
  ],
  providers: [ImageServices],
  exports: [ImageServices, TypeOrmModule],
  controllers: [ImagesController]
})
export class ImagesModule {
  constructor() {
    ImagesHelper.createDir();
  }
}