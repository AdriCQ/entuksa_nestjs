import { Request } from 'express';
import { User } from './users/user.model';
/**
 * IReqAuth
 */
export interface IReqAuth extends Request {
  user: User;
}