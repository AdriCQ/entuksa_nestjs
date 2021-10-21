import { IsNotEmpty, IsNumber } from "class-validator";
/**
 * Only id dto
 */
export class OnlyIdDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}