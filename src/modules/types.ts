import { Request } from 'express';
import { User } from './users/user.model';
/**
 * IReqAuth
 */
export interface IReqAuth extends Request {
  user: User;
}
/**
 * 
 */
export enum DB_COLUMN {
  bigint = 'bigint',
  boolean = 'boolean',
  int = 'int',
  json = 'json',
  smallint = 'smallint',
  timestamp = 'timestamp',
  varchar = 'varchar',
}