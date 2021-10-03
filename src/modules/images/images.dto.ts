import { IsArray, IsIn, IsObject, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { IImage } from "./images";
/**
 * Create image dto
 */
export class CreateImageDto {
  @IsIn(['OFFER', 'STORE', 'USER'])
  @ApiProperty({ example: "'OFFER' | 'STORE' | 'USER'" })
  type: IImage.Type;

  @IsArray()
  @ApiProperty({ isArray: true })
  tags: string[];

  @IsObject()
  @ApiProperty()
  image: any;
}
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