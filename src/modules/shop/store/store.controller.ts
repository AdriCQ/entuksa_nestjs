import { JwtAuthGuard } from '@modules/users/auth/auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ShopStore } from './store.model';
import { ShopStoreService } from './store.service';
import { PositionsService } from '@modules/map/positions/positions.service';
// import { CheckPermission } from '@modules/users/casl/casl.decorator';
import { PermissionFactory } from '@modules/users/casl/casl.factory';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
/**
 * Shop store controller
 */
@ApiTags('Shop Store')
@ApiBearerAuth()
@Controller('api/shop/stores')
export class ShopStoreController {
  /**
   * Creates an instance of shop store controller.
   * @param service
   */
  constructor(private readonly service: ShopStoreService, private readonly positionService: PositionsService, private readonly permission: PermissionFactory) { }
  /**
   * id
   * @param id
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({ status: 200, type: () => ShopStore })
  async byId(@Param('id') id: number): Promise<ShopStore> {
    return await this.service.getById(id);
  }
}
