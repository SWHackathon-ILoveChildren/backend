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

  async addCareType({ careTypes, userId }) {
    return await this.careTypesRepository.save(
      careTypes.map((careType) => ({
        name: careType,
        user: { id: userId },
      }))
    );
  }
}
