import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) {}

  async addSitterUser({ sitterUserId }) {
    await this.profileRepository.save({
      user: {
        id: sitterUserId,
      },
    });
  }

  async addCareCounting({ sitterUserId }) {
    const sitterProfile = await this.profileRepository.findOne({
      where: {
        user: {
          id: sitterUserId,
        },
      },
    });

    if (sitterProfile) {
      sitterProfile.careCounting += 1;
      await this.profileRepository.save(sitterProfile);
    }
  }
}
