import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), UsersModule],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
