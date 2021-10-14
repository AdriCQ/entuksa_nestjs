import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
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
    // TODO: Add more filter parameters
    return await this.repo.find({
      where: [
        { title: _p.title },
      ]
    })
  }
}