import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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