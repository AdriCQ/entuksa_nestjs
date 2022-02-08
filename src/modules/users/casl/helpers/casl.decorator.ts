import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from '../dtos';

export const CHECK_PERMISSION_KEY = 'check_policy';
export const CheckPermission = (...handlers: PolicyHandler[]) =>
  SetMetadata(CHECK_PERMISSION_KEY, handlers);
