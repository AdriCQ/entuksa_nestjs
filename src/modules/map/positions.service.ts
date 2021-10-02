import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MapPosition } from "./position.model";
/**
 * Positions service
 */
export class PositionsService {
  /**
   * Creates an instance of positions service.
   * @param repo 
   */
  constructor(@InjectRepository(MapPosition) private readonly repo: Repository<MapPosition>) { }
  /**
   * Creates positions service
   * @param _param 
   * @returns create 
   */
  async create(_param: MapPosition): Promise<MapPosition> {
    const position = new MapPosition();
    position.address = _param.address;
    position.coordinate = _param.coordinate;
    position.validatedAt = null;
    await this.repo.save(position);
    return position;
  }
}