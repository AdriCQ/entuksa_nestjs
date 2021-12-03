import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
// Local
import { ShopOrderCreateDto } from './order.dto';
import { ShopOrder } from './order.model';
import { ShopOrderService } from './order.service';
// Extra
import { JwtAuthGuard } from '@modules/users/auth/auth.guard';
import { User } from '@modules/users/user.model';
import { IReqAuth } from '@modules/types';
import { ShopOrderOffer } from './orderOffer.model';

/**
 * ShopOrderController
 */
@Controller('/api/shop/orders')
@UseGuards(JwtAuthGuard)
@ApiTags('Shop Orders')
@ApiBearerAuth()
export class ShopOrderController {
  constructor(
    private $service: ShopOrderService
  ) { }
  /**
   * Create Order
   * @param _body 
   * @param _req 
   */
  @Post('/')
  @ApiResponse({ type: () => ShopOrder, status: 201 })
  async create(@Body() _body: ShopOrderCreateDto, @Req() _req: IReqAuth): Promise<ShopOrder> {
    const client: User = _req.user;
    _body.client = client;
    return await this.$service.create(_body);
  }
  /**
   * getPrice
   * @param _body 
   * @returns 
   */
  @Post('/price')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: Number })
  async getPrice(@Body() _body: ShopOrderOffer[]): Promise<number> {
    return (await this.$service.getPrice(_body)).price;
  }
}