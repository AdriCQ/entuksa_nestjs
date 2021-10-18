import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Log } from "./log.model";
import { LogService } from './logs.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [LogService],
  exports: [TypeOrmModule, LogService]
})
export class LogModule { }