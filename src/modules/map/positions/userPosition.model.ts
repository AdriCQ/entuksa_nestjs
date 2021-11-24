import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
// Modules
import { User } from '@modules/users/user.model';
import { MapPosition } from './position.model';
/**
 * UserPositionModel
 */
@Entity('user_map_positions')
export class UserMapPosition {
  /**
   * Id
   */
  @PrimaryGeneratedColumn()
  @IsNumber()
  @ApiProperty()
  id: number;
  /**
   * Title
   */
  @Column()
  @IsString()
  @ApiProperty()
  title: string;
  /**
   * -----------------------------------------
   *	Relations
   * -----------------------------------------
   */
  /**
   * 
   */
  @ManyToOne(() => MapPosition, pos => pos.userPositions, { onDelete: 'CASCADE', eager: true })
  @ApiProperty({ type: () => MapPosition })
  position: MapPosition;
  /**
   * User
   */
  @ManyToOne(() => User, user => user.mapPositions, { onDelete: 'CASCADE', })
  @ApiProperty({ type: () => User })
  user: User;
}