import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesController } from "./http/images.controller";
import { Image } from "./entities/images.entity";
import { ImageServices } from './services/images.service';
import { ImagesHelper } from './services/images.helper';

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


export * from './entities/images.entity';

export * from './dtos';
export * from './entities/images.entity';
export * from './services/images.helper';
export * from './services/images.service';