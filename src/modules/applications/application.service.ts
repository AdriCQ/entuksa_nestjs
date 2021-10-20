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
    // TODO: get Current Locality
    const locality = await this.localityService.getByCoordinates(_p.coordinates);
    const stores = await this.shopStoreService.getByLocality({ locality, filter: { verified: true, open: true }, withOffers: true });
    const blocks: ClientAppBlocksDto[] = [];
    return {
      blocks,
      user: _p.user,
      locality,
      stores
    }
  }
}