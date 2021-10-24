import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
/**
 * Only id dto
 */
export class OnlyIdDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}