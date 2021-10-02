import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
}