import { Module } from "@nestjs/common";
import { OfferServices } from './offers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOffer } from './offer.model';
import { ShopOffersController } from "./offers.controller";

@Module({
  controllers: [ShopOffersController],
  exports: [OfferServices, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([ShopOffer])],
  providers: [OfferServices]
})
export class ShopOffersModule { }