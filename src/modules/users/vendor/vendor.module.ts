import { Module } from "@nestjs/common";
import { UserVendorController } from './vendor.controller';
import { ShopStoreModule } from "@modules/shop/store/store.module";

@Module({
  imports: [
    ShopStoreModule
  ],
  controllers: [UserVendorController],
})
export class UserVendorModule { }