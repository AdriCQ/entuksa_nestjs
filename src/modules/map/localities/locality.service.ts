import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
   * Seed locality service
   */
  async seed() {
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