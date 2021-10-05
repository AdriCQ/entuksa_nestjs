import { ShopStore } from '@modules/shop/store/store.model';
import * as argon from 'argon2';
import {
  IsArray,
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { BaseModel } from '../BaseModel';
import { IUser } from './users';
import { UserAuthSignupDto } from './users.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ShopOrder } from '../shop/order/order.model';
@Entity('users')
export class User extends BaseModel {
  /**
   * Creates an instance of user.
   * @param [_user]
   */
  constructor(_user?: UserAuthSignupDto) {
    super();
    if (_user) {
      this.email = _user.email;
      this.name = _user.name;
      this.lastName = _user.lastName;
      this.password = _user.password;
      this.roles = ['CLIENT'];
    }
  }
  /**
   * Name  of user
   */
  @Column()
  @IsString()
  @ApiProperty()
  name: string;
  /**
   * Last name of user
   */
  @Column()
  @IsString()
  @ApiProperty()
  lastName: string;
  /**
   * Email  of user
   */
  @Column({ unique: true })
  @IsEmail()
  @ApiProperty({ uniqueItems: true, example: 'myemail@email.com' })
  email: string;
  /**
   * Mobile phone of user
   */
  @Column({ type: 'varchar', length: 12, unique: true, nullable: true })
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ example: '55555555' })
  mobilePhone: string;
  /**
   * Password  of user
   */
  @Column()
  @IsString()
  @ApiProperty()
  password: string;
  /**
   * Roles  of user
   */
  @Column({ type: 'json', default: `["CLIENT"]` })
  @IsArray()
  @ApiProperty({ isArray: true, example: '["DEVELOPER", "ADMIN", "VENDOR", "MODERATOR", "DELIVER", "CLIENT"]' })
  roles: IUser.Role[];
  /**
   * -----------------------------------------
   *	Relations
   * -----------------------------------------
   */
  @OneToMany(() => ShopOrder, order => order.client)
  orders: ShopOrder[];
  /**
   * Stores  of user
   */
  @OneToMany(() => ShopStore, (store) => store.vendor)
  stores: ShopStore[];
  /**
   * -----------------------------------------
   *	Before Enter Data
   * -----------------------------------------
   */
  @BeforeInsert()
  async beforeInsert() {
    this.password = await argon.hash(this.password);
  }
  /**
   * -----------------------------------------
   *	Getters & Setters
   * -----------------------------------------
   */
  /**
   * Assigns role
   * @param _role
   * @returns role
   */
  assignRole(_role: IUser.Role): IUser.Role[] {
    if (!this.roles.includes(_role)) this.roles.push(_role);
    return this.roles;
  }
  /**
   * Determines whether any role has
   * @param _roles
   * @returns true if any role
   */
  hasAnyRole(_roles: IUser.Role[]): boolean {
    let has = false;
    _roles.forEach((_r) => {
      if (this.hasRole(_r)) has = true;
    });
    return has;
  }
  /**
   * Determines whether role has
   * @param _role
   * @returns true if role
   */
  hasRole(_role: IUser.Role): boolean {
    return this.roles.includes(_role);
  }
  /**
   * Validates password
   * @param password
   * @returns password
   */
  async validatePassword(password: string): Promise<boolean> {
    return await argon.verify(this.password, password);
  }
}
/**
 * Users auth response dto
 */
export class UsersAuthResponseDto {
  @ValidateNested()
  @Type(() => User)
  @ApiProperty()
  user: User;
  @IsString()
  @ApiProperty({ description: 'User auth token' })
  token: string;
}