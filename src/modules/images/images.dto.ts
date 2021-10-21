import { IsIn, IsObject, IsString, ValidateNested } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { IImage } from "./images";
import { Type } from "class-transformer";
import { User } from '@modules/users/user.model';
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
  @IsIn(['OFFER', 'STORE', 'USER'])
  @ApiProperty({ example: "'OFFER' | 'STORE' | 'USER'" })
  type: IImage.Type;
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
  @Type(() => User)
  @ApiProperty({ type: () => User })
  owner: User;
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