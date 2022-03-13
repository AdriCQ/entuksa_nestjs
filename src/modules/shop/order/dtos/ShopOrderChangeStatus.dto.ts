import { OnlyIdDto } from '@modules/base.dto';
import { User } from '@modules/users/user.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsString, ValidateNested } from 'class-validator';
import { IShopOrderStatus } from '.';

/**
 * ShopOrderChangeStatus
 */
export class ShopOrderChangeStatus {
  /**
   * Order  of shop order change status req dto
   */
  @ValidateNested()
  @Type(() => OnlyIdDto)
  @ApiProperty({ type: () => OnlyIdDto })
  order: OnlyIdDto;
  /**
   * Client  of shop order change status req dto
   */
  @ValidateNested()
  @Type(() => User)
  @ApiProperty({ type: () => User })
  client: User;
  /**
   * Status  of shop order change status req dto
   */
  @IsIn(['PROCESSING', 'ACCEPTED', 'READY', 'C_CANCELED', 'V_CANCELED', 'ONWAY', 'COMPLETED', 'RECLAIM', 'RECLAIM_COMPLETE'])
  @ApiProperty({ example: "'PROCESSING' | 'ACCEPTED' | 'READY' | 'C_CANCELED' | 'V_CANCELED' | 'ONWAY' | 'COMPLETED' | 'RECLAIM' | 'RECLAIM_COMPLETE'" })
  status: IShopOrderStatus;
  /**
   * Message  of shop order change status req dto
   */
  @IsString()
  @ApiPropertyOptional()
  message?: string;
}