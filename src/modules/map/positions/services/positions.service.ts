import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
// Local
import { MapPosition } from '../entitites/position.entity';
import { CreateMapPositionDto, UpdateMapPositionDto } from '../dtos';
// Modules
/**
 * Positions service
 */
@Injectable()
export class MapPositionsService {
  /**
   * Creates an instance of positions service.
   * @param repo
   */
  constructor(
    @InjectRepository(MapPosition) private readonly repo: Repository<MapPosition>
  ) {}
  /**
   * id
   * @param _id
   * @returns id
   */
  async byId(_id: number): Promise<MapPosition> {
    return await this.repo.findOne(_id);
  }
  /**
   * Creates positions service
   * @param _param
   * @returns create
   */
  async create(_param: CreateMapPositionDto): Promise<MapPosition> {
    const position = new MapPosition();
    position.address = _param.address;
    position.coordinate = _param.coordinate;
    position.validatedAt = null;
    await this.repo.save(position);
    return position;
  }
  /**
   * delete
   * @param _p 
   * @returns 
   */
  async delete(_p: DeepPartial<MapPosition>) { return await this.repo.delete(_p) }
  /**
   * Updates positions service
   * @param _id 
   * @param _pos 
   * @returns update 
   */
  async update(_id: number, _pos: UpdateMapPositionDto): Promise<MapPosition> {
    const position = await this.byId(_id);
    if (!position)
      throw new HttpException('No se encontró', 400)
    // Update position
    if (_pos.address)
      position.address = _pos.address;
    if (_pos.coordinate)
      position.coordinate = _pos.coordinate;
    await this.repo.update(_id, position);
    return position;
  }
}
