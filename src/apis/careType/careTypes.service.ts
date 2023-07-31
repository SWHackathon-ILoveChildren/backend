import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CareType } from './entities/careType.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CareTypesService {
  constructor(
    @InjectRepository(CareType)
    private careTypesRepository: Repository<CareType>
  ) {}

  async findOneBySitterUserId({ sitterUserId }) {
    return await this.careTypesRepository.find({
      where: {
        user: {
          id: sitterUserId,
        },
      },
      relations: ['user'],
    });
  }

  async addCareType({ careTypes, userId }) {
    return await this.careTypesRepository.save(
      careTypes.map((careType) => ({
        name: careType,
        user: { id: userId },
      }))
    );
  }
}
