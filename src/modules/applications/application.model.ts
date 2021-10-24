import { Entity, Column } from 'typeorm';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from '@modules/BaseModel';
import * as argon from 'argon2';
import { ApplicationSettingsDto } from './application.dto';
import { Type } from 'class-transformer';
/**
 * Application
 */
@Entity('applications')
export class Application extends BaseModel {
  /**
   * Title  of application
   */
  @Column()
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * Description  of application
   */
  @Column()
  @IsString()
  @ApiProperty()
  description: string;
  /**
   * Settings  of application
   */
  @Column({ type: 'json' })
  @ValidateNested()
  @Type(() => ApplicationSettingsDto)
  @ApiProperty({ type: () => ApplicationSettingsDto })
  settings: ApplicationSettingsDto;
  /**
   * Version  of application
   */
  @Column({ default: 0 })
  @IsNumber()
  @ApiProperty()
  version: number;
  /**
   * Gets token
   */
  @ApiProperty()
  private get token(): string {
    return (`${this.id}|${this.title}`).replace(' ', '_');
  }
  /**
   * Gets hash token
   */
  async hashToken(): Promise<string> {
    return await argon.hash(this.token);
  }
  /**
   * Validates token
   * @param _tokenHash 
   * @returns token 
   */
  async validateToken(_tokenHash: string): Promise<boolean> {
    return await argon.verify(_tokenHash, this.token);
  }
}