import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Local
import { MapPositionController } from './position.controller';
import { MapPosition } from './position.model';
import { MapPositionsService } from './positions.service';
import { UserMapPosition } from './userPosition.model';

/**
 * Position module
 */
@Module({
  controllers: [MapPositionController],
  imports: [TypeOrmModule.forFeature([MapPosition, UserMapPosition])],
  exports: [TypeOrmModule, MapPositionsService],
  providers: [MapPositionsService],
})
export class PositionModule { }
