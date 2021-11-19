import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
// Local
import { ShopOrderCreateDto } from './order.dto';
import { ShopOrder } from './order.model';
import { ShopOrderService } from './order.service';
// Extra
import { JwtAuthGuard } from '@modules/users/auth/auth.guard';
import { User } from '@modules/users/user.model';

/**
 * ShopOrderController
 */
@Controller('/api/shop/orders')
export class ShopOrderController {
  constructor(
    private service: ShopOrderService
  ) { }
  /**
   * Create Order
   * @param _body 
   * @param _req 
   */
  @Post('/')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: () => ShopOrder, status: 201 })
  async create(@Body() _body: ShopOrderCreateDto, @Req() _req: any): Promise<ShopOrder> {
    const client: User = _req.user;
    _body.client = client;
    return await this.service.create(_body);
  }
}