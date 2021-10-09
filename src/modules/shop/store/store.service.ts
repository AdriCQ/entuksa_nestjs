import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreCreateDto } from './store.dto';
import { ShopStore } from './store.model';
/**
 * Shop store service
 */
@Injectable()
export class ShopStoreService {
  /**
   * Creates an instance of shop store service.
   * @param storeRepo
   */
  constructor(
    @InjectRepository(ShopStore)
    private readonly storeRepo: Repository<ShopStore>,
  ) { }
  /**
   * Creates shop store service
   * @param _params
   * @returns create
   */
  async create(_params: StoreCreateDto): Promise<ShopStore> {
    const store = new ShopStore(_params);
    return await this.storeRepo.save(store);
  }
  /**
   * Finds by id
   * @param _id
   * @returns by id
   */
  async findById(_id: number): Promise<ShopStore> {
    return await this.storeRepo.findOne(_id);
  }
}
