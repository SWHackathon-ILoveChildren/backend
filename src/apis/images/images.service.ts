import { Injectable } from '@nestjs/common';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { IImagesSave, SaveImagesReturn } from './interfaces/images.interface';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,

    private usersService: UsersService
  ) {}

  async save({
    sitterUserId,
    saveImagesDto,
  }: IImagesSave): Promise<SaveImagesReturn> {
    this.usersService.sitterUserFindOneById({ sitterUserId });

    const saveResult = await this.imagesRepository.save({
      url: saveImagesDto.url,
      users: {
        id: sitterUserId,
      },
    });

    return {
      id: saveResult.id,
    };
  }
}
