import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { MapPosition } from './position.model';
import { UserMapPosition } from './userPosition.model';
import { CreateMapPositionDto, CreateUserMapPositionDto, UpdateMapPositionDto } from './position.dto';
// Modules
import { User } from '@modules/users/user.model';
/**
 * Positions service
 */
export class MapPositionsService {
  /**
   * Creates an instance of positions service.
   * @param repo
   */
  constructor(
    @InjectRepository(MapPosition) private readonly repo: Repository<MapPosition>,
    @InjectRepository(UserMapPosition) private readonly userPositionsRepo: Repository<UserMapPosition>,
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
   * Save User Position
   * @param _p 
   */
  async createUserPosition(_p: CreateUserMapPositionDto): Promise<UserMapPosition> {
    // Check if position exists
    if (!await this.repo.findOne({ id: _p.position.id })) {
      _p.position = await this.create({
        address: _p.position.address,
        coordinate: _p.position.coordinate
      })
    }
    const pos = this.userPositionsRepo.create({
      position: { id: _p.position.id },
      user: { id: _p.user.id }
    });
    return await this.userPositionsRepo.save(pos);
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
  /**
   * userPositions
   * @param _p 
   */
  async userPositions(_p: { user: User }): Promise<UserMapPosition[]> {
    return await this.userPositionsRepo.find({
      user: { id: _p.user.id }
    });
  }
}
