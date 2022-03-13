import { ApiProperty } from '@nestjs/swagger';
import { IsString, ValidateNested } from 'class-validator';
import { AppSettings } from './mix.dto';

/**
 * Create application dto
 */
export class CreateApplicationDto {
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Description  of application
   */
  @IsString()
  @ApiProperty()
  description: string;
  /**
   * Settings  of application
   */
  @ValidateNested()
  @Type(() => AppSettings)
  @ApiProperty({ type: () => AppSettings })
  settings: AppSettings;
}