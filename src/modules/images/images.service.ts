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
    const img = new Image();
    img.paths = {
      lg: _params.image.path,
      md: _params.image.path,
      sm: _params.image.path,
    }
    img.title = _params.title;
    img.tags = [_params.type];
    img.owner = _params.owner;
    return await this.repo.save(img);
  }
  /**
   * Firsts image services
   * @returns  
   */
  async first() {
    return await this.repo.findOne(1);
  }
  /**
   * Gets by id
   * @param _imgID 
   * @returns by id 
   */
  async getById(_imgID: number): Promise<Image> {
    return await this.repo.findOne(_imgID);
  }
}