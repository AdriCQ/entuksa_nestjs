import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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