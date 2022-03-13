import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// Local
import { Locality } from '../entities/locality.entity';
// Modules
import { MapPosition } from '@modules/map/positions';
/**
 * Create map locality dto
 */
export class CreateMapLocalityDto {
  /**
   * Title  of create map locality dto
   */
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Description  of create map locality dto
   */
  @IsString()
  @ApiProperty()
  description: string;
  /**
   * Parent  of create map locality dto
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => Locality)
  @ApiPropertyOptional({ type: () => Locality })
  parent?: Locality;
  /**
   * Position  of create map locality dto
   */
  @ValidateNested()
  @Type(() => MapPosition)
  @ApiProperty({ type: () => MapPosition })
  position: MapPosition;
}
/**
 * IOsmResponse
 */
export interface IOsmResponse {
  address?: string;
  city?: string;
  state?: string;
  town?: string;
}