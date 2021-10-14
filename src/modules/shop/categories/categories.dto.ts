import { Category } from './category.model';
import { ValidateNested, IsString } from 'class-validator';
import { Type } from 'class-transformer';
/**
 * Create category dto
 */
export class CreateCategoryDto {
  @ValidateNested()
  @Type(() => Category)
  parent: Category;
  /**
   * Tag  of create category dto
   */
  @IsString()
  tag: string;
  /**
   * Title  of create category dto
   */
  @IsString()
  title: string;
  /**
   * Description  of create category dto
   */
  @IsString()
  description: string;
}