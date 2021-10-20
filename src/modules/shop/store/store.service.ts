import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopOffer } from '../offers/offer.model';
import { StoreCreateDto } from './store.dto';
import { ShopStore } from './store.model';
import { ImageServices } from '../../images/images.service';
import { Locality } from '@modules/map/localities/locality.model';
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
    private readonly imageServices: ImageServices
  ) { }
  /**
   * Creates shop store service
   * @param _params
   * @returns create
   */
  async create(_params: StoreCreateDto): Promise<ShopStore> {
    const image = await this.imageServices.first();
    _params.image = image;
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
  /**
   * Gets by locality
   * @param _p 
   * @returns by locality 
   */
  async getByLocality(_p: { locality: Locality, filter?: { open?: boolean, verified?: boolean }, withOffers?: boolean }): Promise<ShopStore[]> {
    let qry = this.storeRepo.createQueryBuilder('store')
      .where('store.locality_id = :localityId', { localityId: _p.locality.id });
    if (_p.withOffers)
      qry = qry.leftJoinAndSelect('store.offers', 'offers');
    if (_p.filter.verified)
      qry = qry.andWhere('store.validated_at is NOT NULL');
    if (_p.filter.open)
      qry = qry.andWhere('store.open = :storeOpen', { storeOpen: _p.filter.open });

    return await qry.getMany();
  }
  /**
   * Offers shop store service
   * @param _id 
   * @returns offers 
   */
  async offers(_id: number): Promise<ShopOffer[]> {
    const store = await this.findById(_id);
    if (store) {
      return store.offers;
    }
    throw new HttpException('No se encontró la tienda', 400);
  }
}
