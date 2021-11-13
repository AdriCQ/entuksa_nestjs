import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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