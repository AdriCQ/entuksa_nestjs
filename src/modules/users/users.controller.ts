import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('api/users')
export class UsersController {
  /**
   * Creates an instance of users controller.
   * @param usersService
   */
  constructor(private readonly usersService: UsersService) { }

  @Get()
  all() {
    return 'AllUsers';
  }
}
