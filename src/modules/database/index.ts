import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
/**
 *
 */
export const DatabaseModuleConfig = TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('typeorm.host'),
    port: configService.get<number>('typeorm.port'),
    username: configService.get('typeorm.username'),
    password: configService.get('typeorm.password'),
    database: configService.get('typeorm.database'),
    entities: [__dirname + '../**/*.model{.ts,.js}'],
    synchronize: configService.get<boolean>('typeorm.sync'),
    autoLoadEntities: true,
    namingStrategy: new SnakeNamingStrategy(),
  }),
  inject: [ConfigService],
  imports: [ConfigModule]
});
