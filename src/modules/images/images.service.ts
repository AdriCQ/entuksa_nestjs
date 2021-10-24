import { Injectable, } from '@nestjs/common';
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
   * @param shopStoreService
   */
  constructor(
    @InjectRepository(Image) private readonly repo: Repository<Image>,
  ) { }
  /**
   * Creates image services
   * @param _params 
   * @returns create 
   */
  async create(_params: CreateImageDto): Promise<Image> {
    const image = await this.repo.save({
      owner: { id: _params.owner.id },
      paths: { sm: _params.image.path, md: _params.image.path, lg: _params.image.path },
      tags: [_params.type],
      title: ''
    });
    return image;
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