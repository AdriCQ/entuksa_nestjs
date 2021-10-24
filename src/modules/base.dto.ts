import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
/**
 * Only id dto
 */
export class OnlyIdDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  id: number;
}
/**
 * Only id string dto
 */
export class OnlyIdStringDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;
}