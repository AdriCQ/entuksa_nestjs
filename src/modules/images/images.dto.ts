import { IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
/**
 * Image paths dto
 */
export class ImagePathsDto {
  @IsString()
  @ApiProperty()
  sm: string;

  @IsString()
  @ApiProperty()
  md: string;

  @IsString()
  @ApiProperty()
  lg: string;
}