import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OfferServices } from './offers.service';
import { OfferFilterRequest, CreateShopOfferDto, UpdateShopOfferDto } from './offers.dto';
import { ShopOffer } from './offer.model';
import { JwtAuthGuard } from '@modules/users/auth/auth.guard';
import { PermissionsGuard } from '@modules/users/casl/casl.guard';
import { AppPermission, Permission } from '@modules/users/casl/casl.factory';
import { CheckPermission } from '@modules/users/casl/casl.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImagesHelper } from '@modules/images/services/images.helper';
import { IImage } from '@modules/images/dtos/images';
import { ImageServices } from '@modules/images/images.service';
import { User } from '@modules/users/user.model';
/**
 * Shop offers controller
 */
@Controller('api/shop/offers')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiTags('Shop Offers')
@ApiBearerAuth()
export class ShopOffersController {
  /**
   * Creates an instance of shop offers controller.
   * @param service 
   */
  constructor(
    private readonly service: OfferServices,
    private readonly imagesService: ImageServices
  ) {}
  /**
 * Creates shop store controller
 * @returns create 
 */
  @Post('/')
  @CheckPermission((perm: AppPermission) => perm.can(Permission.CREATE, ShopOffer))
  @UseInterceptors(
    FileInterceptor('uploadFile', {
      storage: diskStorage({
        destination: './storage/app/images/',
        filename: ImagesHelper.editFileName,
      }),
      fileFilter: ImagesHelper.onlyImagesFilter
    }),
  )
  @ApiResponse({ status: 200, type: () => ShopOffer })
  async create(@UploadedFile() uploadImage: IImage.Uploaded, @Body() _body: CreateShopOfferDto, @Req() req): Promise<ShopOffer> {
    if (!uploadImage)
      throw new HttpException('Imagen no encontrada', 400);
    // Get user
    const auth: User = req.user;
    const image = await this.imagesService.create({
      image: uploadImage,
      owner: { id: auth.id },
      title: `${_body.title}-cover`,
      type: 'OFFER'
    })
    _body.image = image;
    const store = await this.service.create(_body);
    return store;
  }
  /**
   * Creates empty
   * @param _body 
   * @param req 
   */
  @Post('/empty')
  @CheckPermission((perm: AppPermission) => perm.can(Permission.CREATE, ShopOffer))
  @ApiResponse({ status: 201, type: () => ShopOffer })
  async createEmpty(@Body() _body: CreateShopOfferDto): Promise<ShopOffer> {
    _body.image.id = 1;
    return await this.service.create(_body);

  }
  /**
   * Finds shop offers controller
   * @param _offerId 
   */
  @Get('/:offerId')
  @ApiResponse({ status: 200, type: () => ShopOffer })
  async find(@Param('offerId') _offerId: number): Promise<ShopOffer> {
    if (isNaN(_offerId))
      throw new HttpException('Identificador no válido', 400)
    return await this.service.find(_offerId)
  }
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
  /**
   * Removes shop offers controller
   * @param _offerId 
   */
  @Delete('/:offerId')
  @CheckPermission((perm: AppPermission) => (perm.can(Permission.DELETE, ShopOffer)))
  @ApiResponse({})
  async remove(@Param('offerId') _offerId: number) {
    return await this.service.remove(_offerId);
  }
  /**
   * Updates shop offers controller
   * @param _offerId 
   * @param _body 
   * @returns update 
   */
  @Patch('/:offerId')
  @CheckPermission((perm: AppPermission) => perm.can(Permission.UPDATE, ShopOffer))
  @ApiResponse({ status: 200, type: () => ShopOffer })
  async update(@Param('offerId') _offerId: number, @Body() _body: UpdateShopOfferDto): Promise<ShopOffer> {
    await this.service.update(_offerId, _body);
    return this.service.find(_offerId);
  }
}