import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { ImageServices } from './images.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ImagesHelper } from './images.helper';
import { IImage } from "./images";
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
  async uploadImage(@UploadedFile() image: IImage.Uploaded) {

    return;
  }
}