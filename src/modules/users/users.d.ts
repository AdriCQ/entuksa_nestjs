import { User as UserModel } from "./user.model";

export namespace IUser {

  type User = UserModel;
  /**
   * Auth response
   */
  interface ResponseAuth {
    user: User;
    token: string;
  }

  interface JwtPayload {
    id: number;
  }
}