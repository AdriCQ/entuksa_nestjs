import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
// Local
import { UserMapPosition } from '../entitites/userPosition.entity';
import { CreateUserMapPositionDto } from '../dtos';
import { MapPositionsService } from './positions.service';
// Modules
import { User } from '@modules/users/users';
/**
 * MapUserPositionService
 */
@Injectable()
export class MapUserPositionService {
  /**
   * Constructor
   * @param $repo 
   * @param $mapPositionRepo 
   */
  constructor(
    @InjectRepository(UserMapPosition) private readonly $repo: Repository<UserMapPosition>,
    private readonly $mapPositionService: MapPositionsService
  ) {}

  async belongsToUser(_pos: UserMapPosition, _user: User): Promise<boolean> {
    let position: UserMapPosition;
    if (!_pos.user || !_pos.user.id)
      position = await this.$repo.findOne({ id: _pos.id });
    else
      position = _pos;
    return (position.user && position.user.id && _user.id && _user.id === position.user.id)
  }
  /**
   * Save User Position
   * @param _p 
   */
  async create(_p: CreateUserMapPositionDto): Promise<UserMapPosition> {
    // Check if position exists
    if (!_p.position.id || !await this.$mapPositionService.byId(_p.position.id)) {
      _p.position = await this.$mapPositionService.create({
        address: _p.position.address,
        coordinate: _p.position.coordinate
      })
    }
    const pos = this.$repo.create({
      title: _p.title,
      position: { id: _p.position.id },
      user: { id: _p.user.id }
    });
    return await this.$repo.save(pos);
  }
  /**
   * Delete
   * @param _p 
   * @returns 
   */
  async delete(_p: DeepPartial<UserMapPosition>) {
    return await this.$repo.delete(_p);
  }
  /**
   * findOne
   * @param _p 
   * @returns 
   */
  async findOne(_p: DeepPartial<UserMapPosition>): Promise<UserMapPosition> {
    return await this.$repo.findOne({ relations: ['user'], where: _p });
  }
  /**
   * List
   * @param _p 
   */
  async list(_p: { user: User }): Promise<UserMapPosition[]> {
    return await this.$repo.find({
      user: { id: _p.user.id }
    });
  }
  /**
   * update
   * @param _id number
   * @param _pos DeepPartial<UserMapPosition>
   * @return Promise<UserMapPosition>
   */
  async update(_id: number, _pos: DeepPartial<UserMapPosition>): Promise<UserMapPosition> {
    const pos = await this.$repo.findOne(_id);
    if (!pos)
      throw new HttpException('No se encontró la posición', 400);
    await this.$repo.update({
      id: _id
    }, _pos);
    return this.$repo.findOne(_id);
  }
}