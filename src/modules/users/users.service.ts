import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';
import { UserAuthSignupDto } from './users.dto';
/**
 * Users service
 */
@Injectable()
export class UsersService {
  /**
   * Creates an instance of users service.
   * @param userRepo
   */
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) { }
  /**
   * Creates users service
   * @param _user
   * @returns create
   */
  async create(_user: UserAuthSignupDto): Promise<User | null> {
    return await this.userRepo.save(new User(_user));
  }
  /**
   * Exists users service
   * @param _p
   * @returns exists
   */
  async exists(_p: { email: string }): Promise<boolean> {
    const user = await this.userRepo.findOne({ where: { email: _p.email } });
    if (user && user.id) return true;
    return false;
  }
  /**
   * Finds by email
   * @param _email
   * @returns by email
   */
  async find(_p: {
    email?: string;
    mobilePhone?: string;
    id?: number;
  }): Promise<User | undefined> {
    let user: User;
    if (_p.id) user = await this.userRepo.findOne(_p.id);
    if (!user && _p.email)
      user = await this.userRepo.findOne({ where: { email: _p.email } });
    return user;
  }
}
