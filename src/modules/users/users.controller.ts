import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.model';
import { IUser } from './users';
import { UserAuthSignupDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  /**
   * Creates an instance of users controller.
   * @param usersService
   */
  constructor(private readonly usersService: UsersService) {}

  @Get()
  all() {
    return 'AllUsers';
  }
}
