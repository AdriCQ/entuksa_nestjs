import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
// Local
import { MapPosition } from '../entitites/position.entity';
// Modules
import { User } from '@modules/users/users';

/**
 * Map coordinate dto
 */
export class MapCoordinate {
  @IsNumber()
  @ApiProperty()
  lat: number;
  @IsNumber()
  @ApiProperty()
  lng: number;
}
/**
 * Create map position dto
 */
export class CreateMapPositionDto {
  /**
   * Address  of create map position dto
   */
  @IsString()
  @ApiProperty()
  address: string;
  /**
   * Coordinate  of create map position dto
   */
  @ValidateNested()
  @Type(() => MapCoordinate)
  @ApiProperty({ type: () => MapCoordinate })
  coordinate: MapCoordinate;
}
/**
 * Create User Map Position
 */
export class CreateUserMapPositionDto {
  /**
   * User
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => User)
  user?: User;
  /**
   * MapPosition
   */
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => MapPosition)
  @ApiProperty({ type: () => MapPosition })
  position: MapPosition;
  /**
   * Title
   */
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
}
/**
 * Update map position dto
 */
export class UpdateMapPositionDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ nullable: true })
  address: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => MapCoordinate)
  @ApiProperty({ type: () => MapCoordinate, nullable: true })
  coordinate: MapCoordinate;
}