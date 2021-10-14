import { ImageServices } from '@modules/images/images.service';
import { UsersService } from '@modules/users/users.service';
import { Injectable } from '@nestjs/common';
import { CategoriesService } from '../shop/categories/categories.service';
import { LocalityService } from '../map/localities/locality.service';
/**
 * Db seeder service
 */
@Injectable()
export class DbSeederService {
  /**
   * Creates an instance of db seeder service.
   * @param usersService 
   */
  constructor(private readonly usersService: UsersService, private readonly imageServices: ImageServices, private readonly categoriesService: CategoriesService, private readonly localityService: LocalityService) { }
  /**
   * Seed users
   */
  async realSeed() {
    await this.imageServices.seed();
    await this.usersService.create({
      email: 'acq95@nauta.cu',
      lastName: 'Capote',
      mobilePhone: '53375180',
      name: 'Adrian',
      password: 'password'
    });
    await this.categoriesService.seed();
    await this.localityService.seed()
  }
  /**
   * Fakes seed
   */
  async fakeSeed() {
    await this.realSeed();
    // Seed Shop
  }
}