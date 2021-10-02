import { BaseModel } from '../BaseModel';
import { Column, Entity } from 'typeorm';
import { ImagePathsDto } from './images.dto';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
/**
 * Image
 */
@Entity('images')
export class Image extends BaseModel {
  /**
   * Title  of image
   */
  @Column()
  @IsString()
  title: string;
  /**
   * Tags  of image
   */
  @Column({ type: 'json', nullable: true })
  @IsArray()
  tags: string[];
  /**
   * Paths  of image
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => ImagePathsDto)
  paths: ImagePathsDto;
}