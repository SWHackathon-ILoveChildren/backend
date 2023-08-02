import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [ImagesService],
  controllers: [ImagesController],
})
export class ImagesModule {}
