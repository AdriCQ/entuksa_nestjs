import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, HttpException, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ImageServices } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImagesHelper } from './images.helper';
import { IImage } from "./images";
import { Response } from "express";
import { JwtAuthGuard } from '@modules/users/auth/auth.guard';
import { PermissionsGuard } from '@modules/users/casl/casl.guard';
import { User } from '@modules/users/user.model';
/**
 * Images controller
 */
@Controller('api/images')
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
  @Post('upload')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './storage/app/images/',
        filename: ImagesHelper.editFileName,
      }),
      fileFilter: ImagesHelper.onlyImagesFilter
    }),
  )
  @ApiResponse({ status: 200 })
  async uploadImage(@UploadedFile() image: IImage.Uploaded, @Req() req) {
    const user: User = req.user;
    return await this.service.create({
      image,
      type: 'OFFER',
      title: image.filename,
      owner: user
    });
  }
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