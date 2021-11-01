import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Local
import { ShopChat } from './chat.model';
import { ShopChatService } from './chat.service';
/**
 * Shop chat module
 */
@Module({
  imports: [TypeOrmModule.forFeature([ShopChat])],
  providers: [ShopChatService],
  exports: [TypeOrmModule, ShopChatService]
})
export class ShopChatModule { }