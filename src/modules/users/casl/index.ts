import { Global, Module } from '@nestjs/common';
import { PermissionFactory } from './helpers/casl.factory';
@Global()
@Module({
  providers: [PermissionFactory],
  exports: [PermissionFactory],
})
export class CaslModule {}

/**
 * Exports
 */
export * from './dtos';
export * from './helpers/casl.decorator';
export * from './helpers/casl.factory';
export * from './helpers/roles';
export * from './http/casl.guard';
