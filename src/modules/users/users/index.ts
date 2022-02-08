import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
// Local
import { UsersController } from './http/users.controller';
import { User } from './entities/user.entity';
import { UsersService } from './services/users.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}


export * from './dtos';
export * from './entities/user.entity';
export * from './services/users.service';