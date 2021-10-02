import { JwtAuthGuard } from '@modules/users/auth/auth.guard';
import { User } from '@modules/users/user.model';
import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { StoreCreateDto } from './store.dto';
import { ShopStore } from './store.model';
import { ShopStoreService } from './store.service';
import { PositionsService } from '@modules/map/positions.service';
import { MapPosition } from '../../map/position.model';
/**
 * Shop store controller
 */
@Controller('api/shop/stores')
export class ShopStoreController {
  /**
   * Creates an instance of shop store controller.
   * @param service
   */
  constructor(private readonly service: ShopStoreService, private readonly positionService: PositionsService) { }
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
  @Post()
  async create(@Body() body: StoreCreateDto, @Req() req): Promise<ShopStore> {
    const user: User = req.user;
    body.vendor = user;
    // handle position
    // check if exists
    let position: MapPosition;
    if (body.position.id)
      position = await this.positionService.byId(body.position.id);
    if (!position) {
      position = await this.positionService.create({
        address: body.position.address,
        coordinate: body.position.coordinate
      });
    }
    body.position = position;
    return await this.service.create(body);
  }
}
