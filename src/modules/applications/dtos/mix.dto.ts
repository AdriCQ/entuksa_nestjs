import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

/**
 * @type Blocktype
 */
export type AppBlockType = 'offer-widget' | 'offers-group' | 'offers-slider' | 'store-widget' | 'stores-group' | 'stores-slider' | 'title-widget';

/**
 * Application settings dto
 */
export class AppSettings {
  @IsBoolean()
  @ApiProperty()
  open: boolean;
}