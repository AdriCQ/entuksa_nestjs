import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  constructor(@InjectRepository(Image) private readonly repo: Repository<Image>) { }
  /**
   * Creates image services
   * @param _params 
   * @returns create 
   */
  async create(_params: CreateImageDto): Promise<Image> {
    return new Image();
  }
  /**
   * Firsts image services
   * @returns  
   */
  async first() {
    return await this.repo.findOne(1);
  }
  /**
   * Seed image services
   * @returns  
   */
  async seed() {
    if (await this.repo.findOne())
      return;
    const img = new Image();
    img.paths = {
      lg: '',
      md: '',
      sm: ''
    };
    img.tags = [];
    img.title = 'Default Image';
    return await this.repo.save(img)
  }
}