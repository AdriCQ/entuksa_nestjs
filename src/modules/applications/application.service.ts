import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.model';
import { DeepPartial, Repository } from 'typeorm';
import { SetupAppResquestDto, SetupAppResponseDto, ClientBlocksDto, ApplicationSettingsDto } from './application.dto';
// Map Modules
import { LocalityService } from '@modules/map/localities/locality.service';
// Shop MOdules
import { ShopStoreService } from '@modules/shop/store/store.service';
import { ShopStore } from '@modules/shop/store/store.model';
/**
 * App id
 */
export enum APP_ID {
  ENTUKSA_CLIENT = 1,
  ENTUKSA_ADMIN = 2
}
/**
 * Application service
 */
@Injectable()
export class ApplicationService {
  /**
   * Creates an instance of application service.
   * @param repo 
   * @param localityService 
   * @param shopStoreService 
   */
  constructor(
    @InjectRepository(Application) private readonly repo: Repository<Application>,
    private readonly localityService: LocalityService,
    private readonly shopStoreService: ShopStoreService
  ) { }
  /**
   * Gets token
   * @param _appId 
   * @returns token 
   */
  async getToken(_appId: number): Promise<string> {
    const app = await this.repo.findOne(_appId);
    if (!app)
      throw new HttpException('No se econtró la Aplicación', 400);
    const token = await app.hashToken();
    return `${app.id}|${token}`
  }
  /**
   * Saves extra settings
   * @param _app 
   * @param _extra
   * @returns extra settings 
   */
  async saveSettings(_app: Application, _extra: ApplicationSettingsDto): Promise<Application> {
    _app.settings = _extra;
    await this.repo.update({ id: _app.id }, {
      settings: _app.settings
    });
    return _app;
  }
  /**
   * Setups client
   * @returns client 
   */
  async setup(_p: SetupAppResquestDto): Promise<SetupAppResponseDto> {
    const locality = await this.localityService.getByCoordinates(_p.coordinates);
    const user = _p.user ? _p.user : undefined;
    const stores: ShopStore[] = [];
    const blocks: ClientBlocksDto[] = [];
    switch (_p.app.id) {
      case APP_ID.ENTUKSA_CLIENT:
        const localityStores = await this.shopStoreService.getByLocality({
          locality,
          filter: {
            verified: true
          },
          withOffers: true
        });
        stores.push(...localityStores);
        const storeBlock: DeepPartial<ShopStore>[] = [];
        const localityOffers = [];
        localityStores.forEach(_store => {
          localityOffers.push(...(_store.offers));
          storeBlock.push(this.extractStore(_store));
        });
        blocks.push({
          data: storeBlock as ShopStore[],
          type: 'stores-slider'
        });
        if (localityOffers.length > 6) {
          blocks.push({
            data: [],
            type: 'title-widget',
            config: { title: 'Ofertas Destacadas' }
          })
          blocks.push({
            data: localityOffers.slice(0, 4),
            type: 'offers-group',
          });
          blocks.push({
            data: localityOffers.slice(4, localityOffers.length),
            type: 'offers-slider'
          });
        }
        break;
    }
    return {
      locality,
      user,
      blocks,
      stores
    }
  }

  private extractStore(_store: ShopStore): DeepPartial<ShopStore> {
    return {
      id: _store.id,
      createdAt: _store.createdAt,
      description: _store.description,
      image: _store.image,
      open: _store.open,
      position: _store.position,
      rating: _store.rating,
      title: _store.title,
    }
  }
}