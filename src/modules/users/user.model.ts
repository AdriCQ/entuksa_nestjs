import { ShopStore } from "@modules/shop/store/store.model";
import * as argon from "argon2";
import { IsArray, IsEmail, IsNumberString, IsOptional, IsString } from "class-validator";
import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "../BaseModel";
import { IUser } from "./users";
import { UserAuthSignupDto } from "./users.dto";

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
  name: string;
  /**
   * Last name of user
   */
  @Column()
  @IsString()
  lastName: string;
  /**
   * Email  of user
   */
  @Column({ unique: true })
  @IsEmail()
  email: string;
  /**
   * Mobile phone of user
   */
  @Column({ type: 'varchar', length: 12, unique: true, nullable: true })
  @IsOptional()
  @IsNumberString()
  mobilePhone: string;
  /**
   * Password  of user
   */
  @Column()
  @IsString()
  password: string;
  /**
   * Roles  of user
   */
  @Column({ type: 'json', default: `["CLIENT"]` })
  @IsArray()
  roles: IUser.Role[]
  /**
   * -----------------------------------------
   *	Relations
   * -----------------------------------------
   */
  /**
   * Stores  of user
   */
  @OneToMany(type => ShopStore, store => store.vendor)
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
    if (!this.roles.includes(_role))
      this.roles.push(_role);
    return this.roles;
  }
  /**
   * Determines whether any role has
   * @param _roles 
   * @returns true if any role 
   */
  hasAnyRole(_roles: IUser.Role[]): boolean {
    let has = false;
    _roles.forEach(_r => {
      if (this.hasRole(_r))
        has = true;
    })
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