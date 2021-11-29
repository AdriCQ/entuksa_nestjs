import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
// Local
import { CreateMapLocalityDto, IOsmResponse } from './locality.dto';
import { Locality } from './locality.model';
// Modules
import { MapCoordinate } from '@modules/map/positions/position.dto';
import { MapPositionsService } from '@modules/map/positions/positions.service';
/**
 * Locality service
 */
@Injectable()
export class LocalityService {
  /**
   * Creates an instance of locality service.
   * @param repo 
   */
  constructor(
    @InjectRepository(Locality) private readonly repo: Repository<Locality>,
    private readonly mapPositionService: MapPositionsService,
    private readonly $axios: HttpService
  ) { }
  /**
   * byCoordinatesService
   * @param _p 
   * @returns 
   */
  async byCoordinatesService(_p: MapCoordinate) {
    try {
      return this.$axios.get<IOsmResponse>('nominatim.openstreetmap.org/reverse', {
        params: {
          'accept-language': 'es',
          format: 'jsonv2',
          lat: _p.lat,
          lon: _p.lng,
          zoom: 10
        }
      })
    } catch (error) {
      throw new HttpException('No se encontró la localidad', 503);
    }
  }
  /**
   * Gets by coordinates
   * @param _p 
   * @returns by coordinates 
   */
  async getByCoordinates(_p: MapCoordinate): Promise<Locality> {
    let locality = await this.repo.findOne();
    (await this.byCoordinatesService(_p)).subscribe({
      next: async (_resp) => {
        const dataResp = _resp.data;
        let localityTitle = '';
        if (dataResp.state)
          localityTitle = dataResp.state;
        else if (dataResp.city)
          localityTitle = dataResp.city;
        else if (dataResp.town)
          localityTitle = dataResp.town;
        else throw new HttpException('No se encuentra la localidad', 500);
        locality = await this.nameLike(localityTitle);
      },
      error: _e => { console.log('Error', _e); }
    });
    return locality;
  }
  /**
   * Finds locality service
   * @param id 
   * @returns  
   */
  async find(_p: { id: number }) {
    return await this.repo.findOne(_p.id);
  }
  /**
   * nameLike
   * @param _title 
   * @returns 
   */
  async nameLike(_title: string): Promise<Locality> {
    return this.repo.findOne({
      title: Like(`%${_title}%`)
    })
  }
  /**
   * Seed locality service
   */
  async seed() {
    if (await this.repo.findOne())
      return;
    const localities: CreateMapLocalityDto[] = [];
    const position = await this.mapPositionService.create({
      address: 'Palmira',
      coordinate: {
        lat: 0,
        lng: 0
      }
    });
    localities.push({
      title: 'Locality',
      description: 'Description',
      position,
    });
    // Save on DB
    return await this.repo.save(localities);
  }
}