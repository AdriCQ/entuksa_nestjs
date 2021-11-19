import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
// Local
import { ShopOrderOffer } from './orderOffer.model';
// Extra
import { User } from "@modules/users/user.model";
import { OnlyIdDto } from "@modules/base.dto";
import { ShopStore } from '../store/store.model';

/**
 * @type IShopOrderStatus
 */
export type IShopOrderStatus = 'CREATED' | 'PROCESSING' | 'ACCEPTED' | 'READY' | 'C_CANCELED' | 'V_CANCELED' | 'ONWAY' | 'COMPLETED' | 'RECLAIM' | 'RECLAIM_COMPLETE';
export class ShopOrderChangeStatusReqDto {
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
/**
 * ShopOrderCreateDto
 */
export class ShopOrderCreateDto {
  /**
   * Client
   */
  @IsOptional()
  @ValidateNested()
  @Type(() => User)
  @ApiPropertyOptional({ type: () => User, nullable: true })
  client?: User;
  /**
   * orderOffers
   */
  @ValidateNested({ each: true })
  @Type(() => ShopOrderOffer)
  @ApiProperty({ type: () => ShopOrderOffer, isArray: true })
  orderOffers: ShopOrderOffer[];
  /**
   * Vendor
   */
  @ValidateNested()
  @Type(() => ShopStore)
  @ApiProperty({ type: () => ShopStore })
  vendor: ShopStore;
}
/**
 * Shop order price details dto
 */
export class ShopOrderPriceDetailsDto {
  @IsNumber()
  @ApiProperty()
  tax: number;
}