import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionModule } from "../positions/position.module";
import { Locality } from "./locality.model";
import { LocalityService } from "./locality.service";

@Module({
  imports: [TypeOrmModule.forFeature([Locality]), PositionModule],
  providers: [LocalityService],
  exports: [TypeOrmModule, LocalityService]
})
export class LocalityModule { }