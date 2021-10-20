import { ImageServices } from '@modules/images/images.service';
import { UsersService } from '@modules/users/users.service';
import { Injectable } from '@nestjs/common';
import { CategoriesService } from '../shop/categories/categories.service';
import { LocalityService } from '../map/localities/locality.service';
import { ShopStoreService } from '../shop/store/store.service';
import { PositionsService } from '../map/positions/positions.service';
import { ApplicationService } from '@modules/applications/application.service';
import { OfferServices } from '@modules/shop/offers/offers.service';
/**
 * Db seeder service
 */
@Injectable()
export class DbSeederService {
  /**
   * Creates an instance of db seeder service.
   * @param usersService 
   * @param imageServices 
   * @param categoriesService 
   * @param localityService 
   * @param positionsService 
   * @param storeService 
   * @param offerService 
   * @param appService 
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly imageServices: ImageServices,
    private readonly categoriesService: CategoriesService,
    private readonly localityService: LocalityService,
    private readonly positionsService: PositionsService,
    private readonly storeService: ShopStoreService,
    private readonly offerService: OfferServices,
    private readonly appService: ApplicationService
  ) { }
  /**
   * Seed users
   */
  async realSeed() {
    await this.imageServices.seed();
    if (await this.usersService.exists({ email: 'acq95@nauta.cu' }))
      return;
    await this.usersService.create({
      email: 'acq95@nauta.cu',
      lastName: 'Capote',
      mobilePhone: '53375180',
      name: 'Adrian',
      password: 'password'
    });
    await this.appService.seed();
    await this.categoriesService.seed();
    await this.localityService.seed();
  }
  /**
   * Fakes seed
   * @returns  
   */
  async fakeSeed() {
    if (!await this.usersService.find({ id: 1 }))
      await this.realSeed();
    // Get locality
    const locality = await this.localityService.find({ id: 1 });
    const position = await this.positionsService.byId(1);
    // Check user
    let user = await this.usersService.find({ email: 'test@email.email' })
    if (!user) {
      user = await this.usersService.create({
        email: 'test@email.email',
        lastName: 'LastName',
        mobilePhone: '55555555',
        name: 'FirstName',
        password: 'password'
      });
    }
    // Asign Vendor role
    user.assignRole('VENDOR');
    // Create user shop store
    const store = await this.storeService.create({
      description: 'Store Description',
      locality,
      position,
      title: 'Store Title',
      vendor: user
    });

    return {
      locality, position, user, store
    }
  }
}