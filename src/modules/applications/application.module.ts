import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from './application.model';
import { ApplicationMiddleware } from './application.middleware';
import { ApplicationService } from "./application.service";
import { ApplicationController } from "./application.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  controllers: [ApplicationController],
  providers: [ApplicationMiddleware, ApplicationService],
  exports: [TypeOrmModule, ApplicationMiddleware, ApplicationService]
})
export class ApplicationModule { }