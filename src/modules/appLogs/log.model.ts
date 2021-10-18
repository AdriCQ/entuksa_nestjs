import { Entity, Column } from 'typeorm';
import { BaseModel } from '@modules/BaseModel';
import { IsIn, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
/**
 * Log
 */
@Entity('logs')
export class Log extends BaseModel {
  /**
   * Type  of log
   */
  @Column()
  @IsIn(['WARNING', 'INFO', 'ERROR'])
  @ApiProperty()
  type: 'WARNING' | 'INFO' | 'ERROR';
  /**
   * Namespace  of log
   */
  @Column()
  @IsString()
  @ApiProperty()
  namespace: string;
  /**
   * Content  of log
   */
  @Column({ type: 'json' })
  @IsString()
  @ApiProperty()
  content: any;
}