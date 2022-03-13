import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

/**
 * ShopOrderDeliver
 */
export class ShopOrderDeliver {
  @IsBoolean()
  @ApiProperty({ type: Boolean })
  enabled: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({ type: String, nullable: true })
  address?: string;

  @IsOptional()
  @IsDate()
  @ApiProperty({ type: Date, nullable: true })
  requestTime?: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ type: Date, nullable: true })
  time?: Date;
}