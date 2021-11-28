import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Local
import { MapUserPositionController } from './userPosition.controller';
import { MapPosition } from './position.model';
import { MapPositionsService } from './positions.service';
import { MapUserPositionService } from './userPosition.service';
import { UserMapPosition } from './userPosition.model';

/**
 * Position module
 */
@Module({
  controllers: [MapUserPositionController],
  imports: [TypeOrmModule.forFeature([MapPosition, UserMapPosition])],
  exports: [TypeOrmModule, MapPositionsService, MapUserPositionService],
  providers: [MapPositionsService, MapUserPositionService],
})
export class PositionModule { }
