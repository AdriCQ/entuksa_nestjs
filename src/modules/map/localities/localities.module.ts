import { Module } from "@nestjs/common";
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionModule } from "../positions/position.module";
import { Locality } from "./locality.model";
import { LocalityService } from "./locality.service";

@Module({
  imports: [TypeOrmModule.forFeature([Locality]), PositionModule, HttpModule],
  providers: [LocalityService],
  exports: [TypeOrmModule, LocalityService]
})
export class LocalityModule { }