import { BaseModel } from '@modules/BaseModel';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { MapCoordinate } from '../dtos';
import { UserMapPosition } from './userPosition.entity';

/**
 * Map position
 */
@Entity('map_positions')
export class MapPosition extends BaseModel {
  /**
   * Address  of map position
   */
  @Column()
  @IsString()
  @ApiProperty()
  address: string;
  /**
   * Coordinate  of map position
   */
  @Column({ type: 'json', default: `{"lat":0, "lng":0}` })
  @ValidateNested()
  @Type(() => MapCoordinate)
  @ApiProperty({ type: () => MapCoordinate })
  coordinate: MapCoordinate;
  /**
   * Validated at of map position
   */
  @Column({ type: 'timestamp', nullable: true, default: null })
  @IsOptional()
  @IsDate()
  @ApiProperty()
  validatedAt: Date | null;
  /**
   * -----------------------------------------
   *	Relations
   * -----------------------------------------
   */
  @OneToMany(() => UserMapPosition, ump => ump.position, { onDelete: 'CASCADE' })
  // @ApiPropertyOptional({ type: () => UserMapPosition, isArray: true })
  userPositions: UserMapPosition[];
}
