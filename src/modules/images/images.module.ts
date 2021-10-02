import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from "./images.model";
import { ImageServices } from "./images.service";

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImageServices],
  exports: [ImageServices],
})
export class ImagesModule { }