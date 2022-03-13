import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Local
import { MapUserPositionController } from './http/userPosition.controller';
import { MapPosition } from './entitites/position.entity';
import { MapPositionsService } from './services/positions.service';
import { MapUserPositionService } from './services/userPosition.service';
import { UserMapPosition } from './entitites/userPosition.entity';

/**
 * Position module
 */
@Module({
  controllers: [MapUserPositionController],
  imports: [TypeOrmModule.forFeature([MapPosition, UserMapPosition])],
  exports: [TypeOrmModule, MapPositionsService, MapUserPositionService],
  providers: [MapPositionsService, MapUserPositionService],
})
export class PositionModule {}

// DTOS
export * from './dtos';
// Entities
export * from './entitites/position.entity';
export * from './entitites/userPosition.entity';
// Services
export * from './services/positions.service';
export * from './services/userPosition.service';