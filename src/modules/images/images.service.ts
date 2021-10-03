import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImageDto } from './images.dto';
import { Image } from './images.model';
/**
 * Image services
 */
@Injectable()
export class ImageServices {
  /**
   * Creates an instance of image services.
   * @param service 
   */
  constructor(@InjectRepository(Image) private readonly service) { }
  /**
   * Creates image services
   * @param _params 
   * @returns create 
   */
  async create(_params: CreateImageDto): Promise<Image> {
    return new Image();
  }
}