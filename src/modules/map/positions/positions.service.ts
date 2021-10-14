import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MapPosition } from './position.model';
import { CreateMapPositionDto, UpdateMapPositionDto } from './position.dto';
import { HttpException } from '@nestjs/common';
/**
 * Positions service
 */
export class PositionsService {
  /**
   * Creates an instance of positions service.
   * @param repo
   */
  constructor(
    @InjectRepository(MapPosition)
    private readonly repo: Repository<MapPosition>,
  ) { }
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
