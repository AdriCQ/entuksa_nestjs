import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.model';
import { Repository } from 'typeorm';
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
  PALREY_CLIENT = 1,
  PALREY_ADMIN = 2
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
      case APP_ID.PALREY_CLIENT:
        const localityStores = await this.shopStoreService.getByLocality({
          locality,
          filter: {
            verified: true
          }
        });
        stores.push(...localityStores);
        blocks.push({
          data: stores,
          type: 'store-group'
        })
        break;
    }
    return {
      locality,
      user,
      blocks,
      stores
    }
  }
}