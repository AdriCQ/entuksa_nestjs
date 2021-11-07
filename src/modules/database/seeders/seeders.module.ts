import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederMiddleware } from './seeder.middleware';
import { Seeder } from './seeder.model';
@Module({
  imports: [TypeOrmModule.forFeature([Seeder])]
})
export class DbSeederModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SeederMiddleware)
      .forRoutes('/**')
  }
}