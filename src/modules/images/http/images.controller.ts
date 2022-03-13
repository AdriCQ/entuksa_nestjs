import { Controller, Get, Param, Res, HttpException } from '@nestjs/common';
import { ApiTags, } from '@nestjs/swagger';
import { Response } from "express";
// Local
import { ImageServices } from '../services/images.service';
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
  constructor(private readonly service: ImageServices) {}
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