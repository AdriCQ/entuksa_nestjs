import { Module } from '@nestjs/common';
import { PermissionFactory } from './casl.factory';

@Module({
  providers: [PermissionFactory],
  exports: [PermissionFactory],
})
export class CaslModule { }
