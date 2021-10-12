import { Controller, Get } from '@nestjs/common';
import { DbSeederService } from './seeders.service';
/**
 * Db seeder controller
 */
@Controller('db/seed')
export class DbSeederController {
  constructor(private readonly service: DbSeederService) { }
  @Get()
  async realSeed() {
    await this.service.realSeed();
    return 'RealSeed'
  }
}