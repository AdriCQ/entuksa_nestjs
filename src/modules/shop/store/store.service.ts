import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopOffer } from '../offers/offer.model';
import { ShopStore } from './store.model';
import { ImageServices } from '@modules/images/images.service';
import { Locality } from '@modules/map/localities/locality.model';
import { User } from '@modules/users/user.model';
import { StoreCreateDto } from './store.dto';
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
   * Creates empty
   * @param _p 
   * @returns empty 
   */
  async create(_p: StoreCreateDto): Promise<ShopStore> {
    return await this.storeRepo.save({
      image: { id: _p.image.id },
      locality: { id: _p.locality.id },
      description: _p.description,
      position: { id: _p.position.id },
      title: _p.title,
      vendor: { id: _p.vendor.id }
    });
  }
  /**
   * Creates empty
   * @param _p 
   * @returns empty 
   */
  async createEmpty(_p: User): Promise<ShopStore> {
    return await this.storeRepo.save({
      image: { id: 1 },
      locality: { id: 1 },
      description: '',
      position: { id: 1 },
      title: '',
      vendor: { id: _p.id }
    });
  }
  /**
   * Finds by id
   * @param _id
   * @returns by id
   */
  async getById(_id: number): Promise<ShopStore> {
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
   * Gets by vendor
   * @param _vendor 
   * @returns by vendor 
   */
  async getByVendor(_vendor: User): Promise<ShopStore[]> {
    return this.storeRepo.createQueryBuilder('store')
      .leftJoinAndSelect('store.locality', 'locality')
      .leftJoin('store.image', 'image')
      .leftJoinAndSelect('store.position', 'position')
      .where('store.vendor_id = :vendorId', { vendorId: _vendor.id }).getMany()
  }
  /**
   * Offers shop store service
   * @param _id 
   * @returns offers 
   */
  async offers(_id: number): Promise<ShopOffer[]> {
    const store = await this.getById(_id);
    if (store) {
      return store.offers;
    }
    throw new HttpException('No se encontró la tienda', 400);
  }
}
