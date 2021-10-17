import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from "typeorm";
import { ShopOffer } from "./offer.model";
import { OfferFilterRequest } from "./offers.dto";

@Injectable()
export class OfferServices {
  /**
   * Creates an instance of offer services.
   */
  constructor(@InjectRepository(ShopOffer) private readonly repo: Repository<ShopOffer>) { }
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
}