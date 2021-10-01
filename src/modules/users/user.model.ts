import * as argon from "argon2";
import { IsEmail, IsString } from "class-validator";
import { BeforeInsert, Column, Entity } from "typeorm";
import { BaseModel } from "../BaseModel";
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
      this.password = _user.password
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
   * Password  of user
   */
  @Column()
  @IsString()
  password: string;
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
   * Validates password
   * @param password 
   * @returns password 
   */
  async validatePassword(password: string): Promise<boolean> {
    return await argon.verify(this.password, password);
  }

}