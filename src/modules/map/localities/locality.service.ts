import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapCoordinate } from '../positions/position.dto';
import { PositionsService } from '../positions/positions.service';
import { CreateMapLocalityDto } from './locality.dto';
import { Locality } from './locality.model';
/**
 * Locality service
 */
@Injectable()
export class LocalityService {
  /**
   * Creates an instance of locality service.
   * @param repo 
   */
  constructor(@InjectRepository(Locality) private readonly repo: Repository<Locality>, private readonly mapPositionService: PositionsService) { }
  /**
   * Gets by coordinates
   * @param _p 
   * @returns by coordinates 
   */
  async getByCoordinates(_p: MapCoordinate): Promise<Locality> {
    // TODO: Locality service
    console.log({ coordinates: _p });
    return await this.repo.findOne()
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
  /**
   * Finds locality service
   * @param id 
   * @returns  
   */
  async find(_p: { id: number }) {
    return await this.repo.findOne(_p.id);
  }
}