import { Module } from "@nestjs/common";
import { OfferServices } from './offers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOffer } from './offer.model';
import { ShopOffersController } from "./offers.controller";
import { ImagesModule } from "@modules/images/images.module";

@Module({
  controllers: [ShopOffersController],
  exports: [OfferServices, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([ShopOffer]), ImagesModule],
  providers: [OfferServices]
})
export class ShopOffersModule { }