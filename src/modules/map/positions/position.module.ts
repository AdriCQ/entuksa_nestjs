import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MapPosition } from './position.model';
import { PositionsService } from './positions.service';

/**
 * Position module
 */
@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([MapPosition])],
  exports: [TypeOrmModule, PositionsService],
  providers: [PositionsService],
})
export class PositionModule { }
