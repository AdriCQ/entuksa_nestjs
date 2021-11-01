import { OnlyIdDto } from "@modules/base.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsIn, IsString, ValidateNested } from "class-validator";

export type IShopChatInterlocutor = 'CLIENT' | 'VENDOR';
/**
 * Shop chat message
 */
export class ShopChatMessageDto {
  /**
   * To  of shop chat message
   */
  @IsIn(['CLIENT', 'VENDOR'])
  @ApiProperty({ example: "'CLIENT' | 'VENDOR'" })
  to: IShopChatInterlocutor;
  /**
   * Message  of shop chat message
   */
  @IsString()
  @ApiProperty()
  message: string;
  /**
   * Date  of shop chat message dto
   */
  @IsDate()
  @ApiProperty()
  date: Date;
  /**
   * Read  of shop chat message
   */
  @IsBoolean()
  @ApiProperty()
  read: boolean;
}
/**
 * Shop chat save message dto
 */
export class ShopChatSaveMessageDto extends ShopChatMessageDto {
  @ValidateNested()
  @Type(() => OnlyIdDto)
  @ApiProperty({ type: () => OnlyIdDto })
  client: OnlyIdDto;

  @ValidateNested()
  @Type(() => OnlyIdDto)
  @ApiProperty({ type: () => OnlyIdDto })
  vendor: OnlyIdDto;
}