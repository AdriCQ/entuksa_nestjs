import { JwtAuthGuard } from '@modules/users/auth/auth.guard';
import { User } from '@modules/users/user.model';
import { Body, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StoreCreateDto } from './store.dto';
import { ShopStore } from './store.model';
import { ShopStoreService } from './store.service';
import { JwtStrategy } from '../../users/auth/jwt.strategy';
/**
 * Shop store controller
 */
@Controller('api/shop/stores')
export class ShopStoreController {
  /**
   * Creates an instance of shop store controller.
   * @param service 
   */
  constructor(private readonly service: ShopStoreService) { }
  /**
   * id
   * @param id 
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async byId(@Param('id') id: number) {
    return await this.service.findById(id);
  }
  /**
   * Creates shop store controller
   * @param body 
   * @param user 
   * @returns create 
   */
  @UseGuards(JwtAuthGuard)
  async create(@Body() body: StoreCreateDto, @Req() req): Promise<ShopStore> {
    const user: User = req.user;
    body.vendor = user;
    return await this.service.create(body);
  }
}