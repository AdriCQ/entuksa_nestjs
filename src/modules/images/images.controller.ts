import { Controller, Get, Param, Res, HttpException, } from '@nestjs/common';
import { ApiTags, } from '@nestjs/swagger';
import { ImageServices } from './images.service';
import { Response } from "express";
/**
 * Images controller
 */
@Controller('images')
@ApiTags('Images')
export class ImagesController {
  /**
   * Creates an instance of images controller.
   * @param service 
   * @param configService 
   */
  constructor(private readonly service: ImageServices) { }
  /**
   * Uploads image
   */
  // @Post('upload')
  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: './storage/app/images/',
  //       filename: ImagesHelper.editFileName,
  //     }),
  //     fileFilter: ImagesHelper.onlyImagesFilter
  //   }),
  // )
  // @ApiResponse({ status: 200 })
  // async uploadImage(@UploadedFile() image: IImage.Uploaded, @Req() req) {
  //   const user: User = req.user;
  //   return await this.service.create({
  //     image,
  //     type: {
  //       type: 'OFFER',
  //       id: 1
  //     },
  //     title: image.filename,
  //     owner: user
  //   });
  // }
  /**
   * Gets image
   * @param id 
   * @returns image 
   */
  @Get(':size/:id')
  async getById(@Param('id') id: number, @Param('size') _size: 'sm' | 'md' | 'lg', @Res() res: Response) {
    const img = await this.service.getById(id);
    if (!img || !img.paths || !img.paths[_size])
      throw new HttpException('No encontramos la imagen', 400);
    return res.sendFile(img.paths[_size], { root: './' });
  }
}