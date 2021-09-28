import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
/**
 *
 */
export const DatabaseModuleConfig = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('typeorm.host'),
    port: +configService.get<number>('typeorm.port'),
    username: configService.get('typeorm.username'),
    password: configService.get('typeorm.password'),
    database: configService.get('typeorm.database'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: configService.get<boolean>('typeorm.sync'),
    namingStrategy: new SnakeNamingStrategy(),
  }),
  inject: [ConfigService],
});
