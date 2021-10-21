import { Controller, UseGuards, Body, Req, Post, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
// Users
import { JwtAuthGuard } from '@modules/users/auth/auth.guard';
import { PermissionsGuard } from '@modules/users/casl/casl.guard';
import { Roles } from '@modules/users/auth/roles.decorator';
import { Role } from '@modules/users/auth/roles';
import { User } from '@modules/users/user.model';
// Vendor
// Shop Store
import { ShopStore } from '@modules/shop/store/store.model';
import { StoreCreateDto } from '@modules/shop/store/store.dto';
import { ShopStoreService } from '@modules/shop/store/store.service';
/**
 * User vendor controller
 */
@Controller('/api/users/vendors')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Roles(Role.VENDOR)
@ApiBearerAuth()
@ApiTags('User Vendors')
export class UserVendorController {
  /**
   * Creates an instance of user vendor controller.
   * @param service 
   * @param shopStoreService 
   */
  constructor(
    private readonly shopStoreService: ShopStoreService
  ) { }
  /**
   * Creates shop store
   * @param _body 
   * @param req 
   * @returns shop store 
   */
  @Post('/shop/stores')
  @ApiResponse({ status: 201, type: () => ShopStore })
  async createShopStore(@Body() _body: StoreCreateDto, @Req() req): Promise<ShopStore> {
    const user: User = req.user;
    _body.vendor = user;
    const store = await this.shopStoreService.create(_body);
    return await this.shopStoreService.getById(store.id)
  }
  /**
   * Creates shop empty store
   * @param _body 
   * @param req 
   * @returns shop store 
   */
  @Post('/shop/stores/empty')
  @ApiResponse({ status: 201, type: () => ShopStore })
  async createEmptyShopStore(@Req() req): Promise<ShopStore> {
    const user: User = req.user;
    const store = await this.shopStoreService.createEmpty(user);
    return await this.shopStoreService.getById(store.id)
  }
  /**
   * Gets shop stores
   * @returns shop stores 
   */
  @Get('/shop/stores')
  @ApiResponse({ status: 200, type: () => ShopStore, isArray: true })
  async getShopStores(@Req() req): Promise<ShopStore[]> {
    const user: User = req.user;
    return await this.shopStoreService.getByVendor(user);
  }
}