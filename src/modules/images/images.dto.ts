import { IsString } from "class-validator";
/**
 * Image paths dto
 */
export class ImagePathsDto {
  @IsString()
  sm: string;
  @IsString()
  md: string;
  @IsString()
  lg: string;
}