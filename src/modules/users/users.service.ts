import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';
import { IUser } from './users';
import { UserAuthSignupDto } from './users.dto';
import { OnlyIdDto } from '@modules/base.dto';
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
  async assignRole(_user: User, _role: IUser.Role) {
    const user = await this.userRepo.findOne(_user.id);
    if (!user)
      throw new HttpException('No se encontró el usuario', 400);
    user.assignRole(_role);
    this.userRepo.save(user);
  }
  /**
   * Creates users service
   * @param _user
   * @returns create
   */
  async create(_user: UserAuthSignupDto): Promise<User> {
    if (!await this.exists({
      email: _user.email,
      mobilePhone: _user.mobilePhone
    }))
      return await this.userRepo.save(new User(_user));
    else throw new HttpException('Ya existe el usuario', 409);
  }
  /**
   * Exists users service
   * @param _p
   * @returns exists
   */
  async exists(_p: { email: string, mobilePhone: string }): Promise<boolean> {
    const user = await this.userRepo.createQueryBuilder('user').where('user.email = :email', { email: _p.email }).orWhere('user.mobile_phone = :mobilePhone', { mobilePhone: _p.mobilePhone }).getOne();
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
  /**
   * Verifys email
   * @param _user 
   * @returns  
   */
  async verifyEmail(_user: OnlyIdDto): Promise<User> {
    await this.userRepo.update({ id: _user.id }, {
      emailVerifiedAt: new Date()
    });
    return this.find({ id: _user.id })
  }
}
