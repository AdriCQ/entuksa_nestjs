import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.model';
import { Repository } from 'typeorm';
import { SetupClientResponseDto, SetupClientResquestDto, ClientAppBlocksDto } from './application.dto';
import { LocalityService } from '@modules/map/localities/locality.service';
import { ShopStoreService } from '../shop/store/store.service';
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
   * Setups client
   * @returns client 
   */
  async setup(_p: SetupClientResquestDto): Promise<SetupClientResponseDto> {
    const locality = await this.localityService.getByCoordinates(_p.coordinates);
    // Select application
    switch (_p.app.id) {
      //? PalRey Client
      case 1:
        // TODO: get Current Locality
        const stores = await this.shopStoreService.getByLocality({ locality, filter: { verified: true, open: true }, withOffers: true });
        const blocks: ClientAppBlocksDto[] = [];
        return {
          blocks,
          user: _p.user,
          locality,
          stores
        }
      //? Palrey Vendor
      case 2:
        if (!_p.user || isNaN(_p.user.id))
          throw new HttpException('Usuario no encontrado', 400);
        const ownerStoresWithOffers = await this.shopStoreService.filter({
          owner: { id: _p.user.id }
        }, {
          offers: true
        });
        return {
          blocks: [],
          user: _p.user,
          stores: ownerStoresWithOffers,
          locality
        }
      default:
        throw new HttpException('No existe la aplicación', 400);
    }

  }
}