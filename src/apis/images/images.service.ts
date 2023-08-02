import { Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,

    private usersService: UsersService
  ) {}

  async save({ sitterUserId, saveImagesDto }) {
    const user = this.usersService.sitterUserFindOneById({ sitterUserId });

    const result = await this.imagesRepository.save({
      url: saveImagesDto,
    });

    console.log(result);
  }
}
