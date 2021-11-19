import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository, IsNull, Not } from "typeorm";
import { ShopOffer } from "./offer.model";
import { CreateShopOfferDto, OfferFilterRequest, UpdateShopOfferDto } from "./offers.dto";

@Injectable()
export class OfferServices {
  /**
   * Creates an instance of offer services.
   */
  constructor(@InjectRepository(ShopOffer) private readonly repo: Repository<ShopOffer>) { }
  /**
   * Finds available
   * @returns available 
   */
  async available(): Promise<ShopOffer[]> {
    return await this.repo.find({
      where: {
        onsale: true,
        validatedAt: Not(IsNull())
      }
    })
  }
  /**
   * Creates offer services
   * @returns create 
   */
  async create(_p: CreateShopOfferDto): Promise<ShopOffer> {
    return await this.repo.save({
      attributes: _p.attributes,
      category: { id: _p.category.id },
      description: _p.description,
      image: { id: _p.image.id },
      prices: _p.prices,
      stock: _p.stock,
      store: { id: _p.store.id },
      title: _p.title,
      type: _p.type,

    });
  }
  /**
   * Finds offer services
   * @param id 
   * @returns find 
   */
  async find(id: number): Promise<ShopOffer> {
    return this.repo.findOne(id);
  }
  /**
   * Filters offer services
   * @param _p 
   * @returns filter 
   */
  async filter(_p: OfferFilterRequest): Promise<ShopOffer[]> {
    // Where Condition
    const whereOptions: Array<FindConditions<ShopOffer> | string> = [];
    if (_p.store)
      whereOptions.push({ store: _p.store })
    if (_p.title)
      whereOptions.push(`user.title like '%${_p.title}%'`);
    if (_p.rating)
      whereOptions.push({ rating: _p.rating });
    return await this.repo.createQueryBuilder('user').where(whereOptions).getMany()
  }
  /**
   * Removes offer services
   * @param _offerId 
   * @returns  
   */
  async remove(_offerId: number) {
    return await this.repo.delete({ id: _offerId });
  }
  /**
   * Updates offer services
   * @param _offerId 
   * @param _update 
   */
  async update(_offerId: number, _update: UpdateShopOfferDto) {
    return await this.repo.update({ id: _offerId }, _update);
  }
  /**
   * updateQty
   * @param _params 
   * @returns 
   */
  async updateQty(_params: { offerId: number, qty: number }): Promise<ShopOffer> {
    const offer = await this.find(_params.offerId);
    offer.stock.qty = _params.qty;
    await this.update(_params.offerId, {
      stock: {
        status: offer.stock.status,
        qty: _params.qty
      },
    });
    return offer;
  }
}