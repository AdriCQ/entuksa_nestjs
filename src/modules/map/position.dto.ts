import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

/**
 * Map coordinate dto
 */
export class MapCoordinate {
  @IsNumber()
  lat: number;
  @IsNumber()
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
  address: string;
  /**
   * Coordinate  of create map position dto
   */
  @ValidateNested()
  @Type(() => MapCoordinate)
  coordinate: MapCoordinate;
}
/**
 * Update map position dto
 */
export class UpdateMapPositionDto {
  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => MapCoordinate)
  coordinate: MapCoordinate;
}