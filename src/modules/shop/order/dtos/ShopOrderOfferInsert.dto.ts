import { OnlyIdDto } from '@modules/base.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, ValidateNested } from 'class-validator';
/**
 * ShopOrderOfferInsert
 */
export class ShopOrderOfferInsert {
  /**
   * offer
   */
  @ValidateNested()
  @Type(() => OnlyIdDto)
  @ApiProperty({ type: () => OnlyIdDto })
  offer: OnlyIdDto;
  /**
   * qty
   */
  @IsNumber()
  @ApiProperty({ type: Number })
  qty: number;
}