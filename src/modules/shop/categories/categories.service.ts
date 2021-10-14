import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
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