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

  async findOneBySitterUserId({ sitterUserId }) {
    return await this.profileRepository.findOne({
      where: {
        user: {
          id: sitterUserId,
        },
      },
    });
  }

  async findOneByParentsUserId({ parentsUserId }) {
    return await this.profileRepository.findOne({
      where: {
        user: {
          id: parentsUserId,
        },
      },
    });
  }

  async addSitterUser({ sitterUserId }) {
    await this.profileRepository.save({
      user: {
        id: sitterUserId,
      },
    });
  }

  async addParentsUser({ parentsUserId }) {
    await this.profileRepository.save({
      user: {
        id: parentsUserId,
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

  async addCareCountingByParentsUserId({ parentsUserId }) {
    const parentsProfile = await this.profileRepository.findOne({
      where: {
        user: {
          id: parentsUserId,
        },
      },
    });

    if (parentsProfile) {
      parentsProfile.careCounting += 1;
      await this.profileRepository.save(parentsProfile);
    }
  }
}
