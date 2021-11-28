import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
// Local
import { UserMapPosition } from './userPosition.model';
import { CreateUserMapPositionDto } from './position.dto';
import { MapPositionsService } from './positions.service';
// Modules
import { User } from '@modules/users/user.model';
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
  ) { }

  /**
   * Save User Position
   * @param _p 
   */
  async create(_p: CreateUserMapPositionDto): Promise<UserMapPosition> {
    // Check if position exists
    if (!await this.$mapPositionService.byId(_p.position.id)) {
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
    return await this.$repo.findOne(_p);
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
}