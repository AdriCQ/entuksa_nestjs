import { IsIn, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { IImage } from "./images";
import { Type } from "class-transformer";
import { OnlyIdDto } from "@modules/base.dto";
/**
 * Image type dto
 */
export class ImageTypeDto {
  /**
   * Type  of image type dto
   */
  @IsIn(['STORE', 'OFFER', 'PROFILE', 'OTHER'])
  type: 'STORE' | 'OFFER' | 'PROFILE' | 'OTHER';
  /**
   * Type id of image type dto
   */
  @IsNumber()
  id: number;
}
/**
 * Create image dto
 */
export class CreateImageDto {
  /**
   * Title  of create image dto
   */
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Type  of create image dto
   */
  @ValidateNested()
  @Type(() => ImageTypeDto)
  @IsNotEmpty({ message: 'Tipo requerido' })
  @ApiProperty({ type: () => ImageTypeDto })
  type: ImageTypeDto;
  /**
   * Image  of create image dto
   */
  @IsObject()
  @ApiProperty()
  image: IImage.Uploaded;
  /**
   * Owner  of create image dto
   */
  @ValidateNested()
  @Type(() => OnlyIdDto)
  @IsNotEmpty()
  @ApiProperty({ type: () => OnlyIdDto })
  owner: OnlyIdDto;

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