import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CareType } from './entities/careType.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CaresService {
  constructor(
    @InjectRepository(CareType)
    private caresRepository: Repository<CareType>
  ) {}

  async addCareType({ careTypes, userId }) {
    return await this.caresRepository.save(
      careTypes.map((careType) => ({
        name: careType,
        user: { id: userId },
      }))
    );
  }
}
