import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BaseModel } from '@modules/BaseModel';
// Local
import { ShopChatMessageDto } from './chat.dto';
// Modules
import { User } from '@modules/users/user.model';
import { ShopStore } from '@modules/shop/store/store.model';
/**
 * 
 */
@Entity('shop_chat')
export class ShopChat extends BaseModel {
  /**
   * Client  of shop chat
   */
  @ManyToOne(() => User, user => user.shopChats, { cascade: true })
  @ApiPropertyOptional({ type: () => User })
  client: User;
  /**
   * Vendor  of shop chat
   */
  @ManyToOne(() => ShopStore, user => user.shopChats, { cascade: true })
  @ApiPropertyOptional({ type: () => User })
  vendor: ShopStore;
  /**
   * Messages  of shop chat
   */
  @Column({ type: 'json' })
  @ValidateNested({ each: true })
  @Type(() => ShopChatMessageDto)
  @ApiProperty({ type: () => ShopChatMessageDto, isArray: true })
  messages: ShopChatMessageDto[];
}