/* eslint-disable @typescript-eslint/no-unused-vars */
import { User as UserModel } from './user.model';

export namespace IUser {
  type User = UserModel;
  /**
   * Auth response
   */
  interface ResponseAuth {
    user: User;
    token: string;
  }
  /**
   * Jwt payload
   */
  interface JwtPayload {
    id: number;
  }
  /**
   * Role
   */
  type Role =
    | 'DEVELOPER'
    | 'ADMIN'
    | 'MODERATOR'
    | 'VENDOR'
    | 'DELIVER'
    | 'CLIENT';
}
