import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionModule } from "../positions/position.module";
import { PositionsService } from '../positions/positions.service';
import { Locality } from "./locality.model";
import { LocalityService } from "./locality.service";

@Module({
  imports: [TypeOrmModule.forFeature([Locality]), PositionModule],
  providers: [PositionsService, LocalityService],
  exports: [TypeOrmModule, LocalityService, PositionsService]
})
export class LocalityModule { }