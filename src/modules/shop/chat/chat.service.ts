import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShopChatSaveMessageDto } from './chat.dto';
import { ShopChat } from './chat.model';
// Local
/**
 * Shop chat service
 */
@Injectable()
export class ShopChatService {
  /**
   * Creates an instance of shop chat service.
   * @param repo 
   */
  constructor(
    @InjectRepository(ShopChat) private readonly repo: Repository<ShopChat>
  ) { }
  /**
   * Gets by id
   * @param _chatId 
   * @returns by id 
   */
  async getById(_chatId: number): Promise<ShopChat> {
    return await this.repo.findOne(_chatId);
  }
  /**
   * Gets by user
   * @param _userId 
   * @returns by user 
   */
  async getByUser(_userId: number): Promise<ShopChat[]> {
    return await this.repo.find({
      where: { client: { id: _userId } }
    })
  }
  /**
   * Gets by vendor
   * @param _vendorId 
   * @returns by vendor 
   */
  async getByVendor(_vendorId: number): Promise<ShopChat[]> {
    return await this.repo.find({
      where: { vendor: { id: _vendorId } }
    })
  }
  /**
   * Saves message
   * @param _message 
   * @returns message 
   */
  async saveMessage(_saveMessage: ShopChatSaveMessageDto): Promise<ShopChat> {
    // Check if chat exists
    const chat = await this.repo.findOne({ client: _saveMessage.client, vendor: _saveMessage.vendor });
    if (chat) {
      chat.messages.unshift({
        message: _saveMessage.message,
        read: false,
        to: _saveMessage.to,
        date: new Date()
      });
      await this.repo.update(chat.id, { messages: chat.messages });
      return chat;
    }
    return this.repo.save({
      client: _saveMessage.client,
      vendor: _saveMessage.vendor,
      messages: [{
        message: _saveMessage.message,
        date: new Date(),
        read: false,
        to: _saveMessage.to,
      }]
    })
  }
}