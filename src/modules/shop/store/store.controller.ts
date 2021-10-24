import { JwtAuthGuard } from '@modules/users/auth/auth.guard';
import { Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, Body, Req, HttpException, Patch, Delete } from '@nestjs/common';
import { ShopStore } from './store.model';
import { ShopStoreService } from './store.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PermissionsGuard } from '@modules/users/casl/casl.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImagesHelper } from '@modules/images/images.helper';
import { IImage } from '@modules/images/images';
import { StoreCreateDto, UpdateShopStoreDto } from './store.dto';
import { ImageServices } from '@modules/images/images.service';
import { User } from '@modules/users/user.model';
import { CheckPermission } from '@modules/users/casl/casl.decorator';
import { AppPermission } from '@modules/users/casl/casl.factory';
import { Permission } from '@modules/users/casl/casl.factory';
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
  constructor(
    private readonly service: ShopStoreService,
    private readonly imageService: ImageServices
  ) { }
  /**
   * id
   * @param id
   */
  @UseGuards(JwtAuthGuard)
  @Get('/:storeId')
  @ApiResponse({ status: 200, type: () => ShopStore })
  async byId(@Param('storeId') id: number): Promise<ShopStore> {
    return await this.service.getById(id);
  }
  /**
  * Creates shop store controller
  * @returns create 
  */
  @Post('/')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermission((perm: AppPermission) => perm.can(Permission.CREATE, ShopStore))
  @UseInterceptors(
    FileInterceptor('uploadFile', {
      storage: diskStorage({
        destination: './storage/app/images/',
        filename: ImagesHelper.editFileName,
      }),
      fileFilter: ImagesHelper.onlyImagesFilter
    }),
  )
  @ApiResponse({ status: 200, type: () => ShopStore })
  async create(@UploadedFile() uploadImage: IImage.Uploaded, @Body() _body: StoreCreateDto, @Req() req): Promise<ShopStore> {
    if (!uploadImage)
      throw new HttpException('Imagen no encontrada', 400);
    // Get user
    const user: User = req.user;
    _body.vendor = user;
    const image = await this.imageService.create({
      image: uploadImage,
      owner: { id: user.id },
      title: `${_body.title}-cover`,
      type: 'STORE'
    })
    _body.image = image;
    const store = await this.service.create(_body);
    return store;
  }
  /**
   * Creates empty
   * @param _body 
   */
  @Post('/empty')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermission((perm: AppPermission) => perm.can(Permission.CREATE, ShopStore))
  @ApiResponse({ status: 201, type: () => ShopStore })
  async createEmpty(@Body() _body: StoreCreateDto, @Req() req) {
    const user: User = req.user;
    _body.vendor = user;
    return await this.service.createEmpty(_body)
  }
  /**
   * Removes shop store controller
   * @param _storeId 
   * @returns  
   */
  @Delete('/:storeId')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermission((perm: AppPermission) => perm.can(Permission.DELETE, ShopStore))
  @ApiResponse({ status: 200 })
  async remove(@Param('storeId') _storeId: number) {
    return await this.service.remove(_storeId);
  }
  /**
   * Toggles open
   * @param _open 
   */
  @Patch('/:storeId/toggle-open')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermission((perm: AppPermission) => perm.can(Permission.UPDATE, ShopStore))
  @ApiResponse({ status: 200, type: () => ShopStore })
  async toggleOpen(@Body() _body: { open: boolean }, @Param('storeId') _storeId: number) {
    await this.service.toggleOpen(_storeId, _body.open);
    return await this.service.getById(_storeId);
  }
  /**
   * Updates shop store controller
   * @param _body 
   * @param req 
   */
  @Patch('/:storeId')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermission((perm: AppPermission) => perm.can(Permission.UPDATE, ShopStore))
  @ApiResponse({ status: 200, type: () => ShopStore })
  async update(@Body() _body: UpdateShopStoreDto, @Param('storeId') _storeId: number) {
    await this.service.update({ id: _storeId }, _body);
    return await this.service.getById(_storeId);
  }
}
