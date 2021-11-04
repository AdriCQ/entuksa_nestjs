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
  }): Promise<User> {
    if (_p.id) return await this.userRepo.findOne(_p.id);
    else if (_p.email)
      return await this.userRepo.findOne({ where: { email: _p.email } });
    else if (_p.mobilePhone)
      return await this.userRepo.findOne({ where: { mobilePhone: _p.mobilePhone } });
  }

  /**
   * checkConfirmation
   * @param _user 
   * @param _type 
   * @param _confirmation 
   * @returns 
   */
  checkConfirmation(_user: User, _type: 'mobile' | 'email' = 'email', _confirmation: string): boolean {
    return this.generateConfirmationString(_user, _type) === _confirmation;
  }
  /**
   * generateConfirmationString
   * @param _user 
   * @param type 
   * @returns 
   */
  generateConfirmationString(_user: User, type: 'mobile' | 'email' = 'email'): string {
    const date = new Date();
    // const month = date.getMonth() >= 10 ? date.getMonth().toString() : `0${date.getMonth()}`;
    const dayOfMonth = date.getDate() >= 10 ? date.getDate().toString() : `0${date.getDate()}`;
    const userId = _user.id.toString();
    const nameLength = _user.name.length.toString();
    return userId + dayOfMonth + nameLength + (type === 'email' ? '1' : '2');
  }
  /**
   * Verifys email
   * @param _user 
   * @returns  
   */
  async verify(_user: OnlyIdDto, _type: 'email' | 'mobile' = 'email'): Promise<User> {
    if (_type === 'email')
      await this.userRepo.update({ id: _user.id }, {
        emailVerifiedAt: new Date()
      });
    else if (_type === 'mobile')
      await this.userRepo.update({ id: _user.id }, {
        mobilePhoneVerifiedAt: new Date()
      });
    return this.find({ id: _user.id });
  }
}
