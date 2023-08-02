import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../images/entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
