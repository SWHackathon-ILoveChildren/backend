import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../images/entities/image.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  ],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
