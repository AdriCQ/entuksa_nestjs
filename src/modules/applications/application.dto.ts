import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsString, ValidateNested } from 'class-validator';
/**
 * Application settings dto
 */
export class ApplicationSettingsDto {
  @IsBoolean()
  @ApiProperty()
  open: boolean;
}

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
  @Type(() => ApplicationSettingsDto)
  @ApiProperty({ type: () => ApplicationSettingsDto })
  settings: ApplicationSettingsDto;
}