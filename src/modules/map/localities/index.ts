import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionModule } from "../positions";
import { Locality } from "./entities/locality.entity";
import { LocalityService } from "./services/locality.service";

@Module({
  imports: [TypeOrmModule.forFeature([Locality]), PositionModule, HttpModule],
  providers: [LocalityService],
  exports: [TypeOrmModule, LocalityService]
})
export class LocalityModule {}