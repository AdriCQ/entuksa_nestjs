import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import { ShopOffer } from "@modules/shop/offers/offer.model";
import { CreateCategoryDto } from "./categories.dto";
import { Category } from './category.model';

/**
 * Categories service
 */
@Injectable()
export class CategoriesService {
  /**
   * Creates an instance of categories service.
   * @param repo 
   */
  constructor(@InjectRepository(Category) private readonly repo: Repository<Category>) { }
  /**
   * All categories service
   * @returns  
   */
  async all() {
    return await this.repo.find();
  }
  /**
   * Availables categories service
   * @returns available 
   */
  async available(): Promise<Category[]> {
    const available: Category[] = [];
    const all = await this.all();
    all.forEach(category => {
      const offers = category.offers;
      if (offers.length)
        available.push(category);
    })
    return available;
  }
  /**
   * Offers categories service
   * @param _categoryId 
   * @returns offers 
   */
  async offers(_categoryId: number): Promise<ShopOffer[]> {
    const category = await this.repo.findOne(_categoryId);
    if (!category)
      throw new HttpException('No se encontró la categoría', 400);
    return category.offers;
  }
  /**
   * Seed categories service
   */
  async seed() {
    // Search Categories
    if (!await this.repo.findOne())
      return;
    const categories: CreateCategoryDto[] = [];
    categories.push({
      title: 'Store',
      tag: 'base',
      description: 'Base',
      parent: null
    });
    return await this.repo.save(categories);
  }
}