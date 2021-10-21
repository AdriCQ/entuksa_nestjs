import { Global, Module } from '@nestjs/common';
import { PermissionFactory } from './casl.factory';
@Global()
@Module({
  providers: [PermissionFactory],
  exports: [PermissionFactory],
})
export class CaslModule { }
