import { ShopStore } from '@modules/shop/store/store.model';
import * as argon from 'argon2';
import {
  IsArray,
  IsDate,
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
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ShopOrder } from '../shop/order/order.model';
import { Image } from '@modules/images/images.model';
import { ShopChat } from '@modules/shop/chat/chat.model';
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
      this.mobilePhone = _user.mobilePhone;
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
   * Email verified at of user
   */
  @Column({ nullable: true, default: null })
  @IsOptional()
  @IsDate()
  @ApiProperty()
  emailVerifiedAt: Date | null;
  /**
   * Mobile phone of user
   */
  @Column({ type: 'varchar', length: 12, unique: true, nullable: true })
  @IsOptional()
  @IsNumberString()
  @ApiProperty({ example: '55555555' })
  mobilePhone?: string;
  /**
   * mobilePhone verified at of user
   */
  @Column({ nullable: true, default: null })
  @IsOptional()
  @IsDate()
  @ApiProperty()
  mobilePhoneVerifiedAt: Date | null;
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
  /**
   * Images  of user
   */
  @OneToMany(() => Image, img => img.owner)
  @ApiPropertyOptional({ type: () => Image, isArray: true })
  images: Image[];
  /**
   * Orders  of user
   */
  @OneToMany(() => ShopOrder, order => order.client)
  @ApiPropertyOptional({ type: () => ShopOrder, isArray: true })
  orders: ShopOrder[];
  /**
   * Stores  of user
   */
  @OneToMany(() => ShopStore, (store) => store.vendor)
  @ApiPropertyOptional({ type: () => ShopStore, isArray: true })
  stores: ShopStore[];
  /**
   * Shop chats of user
   */
  @OneToMany(() => ShopChat, sc => sc.client)
  @ApiPropertyOptional({ type: () => ShopChat, isArray: true })
  shopChats: ShopChat[];
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