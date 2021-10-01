import { Module } from "@nestjs/common";
import { CaslAbilityFactory } from './casl.factory';

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory]
})
export class CaslModule { }