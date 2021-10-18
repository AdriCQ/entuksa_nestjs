import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Application } from './application.model';
import { Repository } from 'typeorm';
import { CreateApplicationDto, SetupClientResponseDto, SetupClientResquestDto } from './application.dto';
import { LocalityService } from '@modules/map/localities/locality.service';
/**
 * Application service
 */
@Injectable()
export class ApplicationService {
  /**
   * Creates an instance of application service.
   * @param repo 
   * @param usersService 
   * @param storeService 
   * @param categoriesService 
   * @param offersService 
   * @param localityService
   */
  constructor(
    @InjectRepository(Application) private readonly repo: Repository<Application>,
    private readonly localityService: LocalityService,
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
   * Seed application service
   * @returns  
   */
  async seed() {
    // Check applications
    if (await this.repo.findOne(1))
      return;
    const applications: CreateApplicationDto[] = [];
    applications.push({
      title: 'Palrey-Client',
      description: 'Palrey Client',
      settings: {
        open: true
      }
    });
    return await this.repo.save(applications);
  }
  /**
   * Setups client
   * @returns client 
   */
  async setupClient(_p: SetupClientResquestDto): Promise<SetupClientResponseDto> {
    // get Current Locality
    const locality = await this.localityService.getByCoordinates(_p.coordinates);
    const stores = locality.shopStores;
    return {
      user: _p.user,
      locality,
      stores
    }
  }
}