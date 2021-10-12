import { ImagesModule } from '@modules/images/images.module';
import { ImageServices } from '@modules/images/images.service';
import { UsersModule } from '@modules/users/users.module';
import { UsersService } from '@modules/users/users.service';
import { Module } from '@nestjs/common';
import { DbSeederController } from './seeders.controller';
import { DbSeederService } from './seeders.service';
@Module({
  imports: [UsersModule, ImagesModule],
  controllers: [DbSeederController],
  providers: [DbSeederService, UsersService, ImageServices]
})
export class DbSeederModule { }