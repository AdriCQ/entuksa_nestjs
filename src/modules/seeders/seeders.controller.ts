import { Controller, Get } from '@nestjs/common';
import { DbSeederService } from './seeders.service';
import { ApiTags, ApiResponse } from "@nestjs/swagger";
/**
 * Db seeder controller
 */
@Controller('db/seed')
@ApiTags('Database Seed')
export class DbSeederController {
  /**
   * Creates an instance of db seeder controller.
   * @param service 
   */
  constructor(private readonly service: DbSeederService) { }
  /**
   * Reals seed
   * @returns  
   */
  @Get()
  @ApiResponse({ status: 200 })
  async realSeed() {
    return await this.service.realSeed();
  }
  /**
   * Fakes seed
   */
  @Get('/fake')
  @ApiResponse({ status: 200 })
  async fakeSeed() {
    return await this.service.fakeSeed();
  }
}