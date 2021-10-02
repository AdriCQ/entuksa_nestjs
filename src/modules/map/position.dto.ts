import { IsNumber } from "class-validator";

/**
 * Map coordinate dto
 */
export class MapCoordinate {
  @IsNumber()
  lat: number;
  @IsNumber()
  lng: number;
}