import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, TableColumnOptions } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

export class BaseModel {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;
  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;
  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
/**
 * BaseModelWithImage
 */
export class BaseModelWithImage extends BaseModel {
  @Column()
  @ApiProperty()
  imageId: number;
}
/**
 * BASE_COLUMNS
 */
export const BASE_COLUMNS: TableColumnOptions[] = [
  {
    name: 'id',
    type: 'bigint',
    isGenerated: true,
    isPrimary: true
  }, {
    name: 'created_at',
    type: 'timestamp',
    default: 'now()'
  }, {
    name: 'updated_at',
    type: 'timestamp',
    isNullable: true,
    default: 'now()',
  }
]