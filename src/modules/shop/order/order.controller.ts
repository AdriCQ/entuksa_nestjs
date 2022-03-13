import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
// Local
import { ShopOrderCreate } from './dtos';
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
  ) {}
  /**
   * Create Order
   * @param _body 
   * @param _req 
   */
  @Post('/')
  @ApiResponse({ type: () => ShopOrder, status: 201 })
  async create(@Body() _body: ShopOrderCreate, @Req() _req: IReqAuth): Promise<ShopOrder> {
    const client: User = _req.user;
    const createParams: ShopOrderCreate = { ..._body, client };
    return await this.$service.create(createParams);
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