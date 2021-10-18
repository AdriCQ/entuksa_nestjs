import { Body, Controller, Get } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { OfferServices } from './offers.service';
import { OfferFilterRequest } from './offers.dto';
import { ShopOffer } from './offer.model';
/**
 * Shop offers controller
 */
@Controller('api/shop/offers')
@ApiTags('Shop Offers')
export class ShopOffersController {
  /**
   * Creates an instance of shop offers controller.
   * @param service 
   */
  constructor(private readonly service: OfferServices) { }
  /**
   * Filters shop offers controller
   * @param body 
   * @returns filter 
   */
  @Get('/filter')
  @ApiResponse({ status: 200, type: () => ShopOffer, isArray: true })
  async filter(@Body() body: OfferFilterRequest): Promise<ShopOffer[]> {
    return await this.service.filter(body);
  }
}