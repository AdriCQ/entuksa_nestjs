import { Module } from "@nestjs/common";
import { OfferServices } from './offers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopOffer } from './offer.model';

@Module({
  controllers: [],
  exports: [OfferServices, TypeOrmModule],
  imports: [TypeOrmModule.forFeature([ShopOffer])],
  providers: [OfferServices]
})
export class ShopOffersModule { }