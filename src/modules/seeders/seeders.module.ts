import { ImagesModule } from '@modules/images/images.module';
import { ImageServices } from '@modules/images/images.service';
import { CategoriesModule } from '@modules/shop/categories/categories.module';
import { CategoriesService } from '@modules/shop/categories/categories.service';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@modules/users/users.service';
import { Module } from '@nestjs/common';
import { DbSeederController } from './seeders.controller';
import { DbSeederService } from './seeders.service';
@Module({
  imports: [UsersModule, ImagesModule, CategoriesModule],
  controllers: [DbSeederController],
  providers: [DbSeederService, UsersService, ImageServices, CategoriesService]
})
export class DbSeederModule { }