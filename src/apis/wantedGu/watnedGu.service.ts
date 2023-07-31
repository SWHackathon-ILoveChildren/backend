import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WantedGu } from './entities/wantedGu.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WantedGuService {
  constructor(
    @InjectRepository(WantedGu)
    private wantedGuRepository: Repository<WantedGu>
  ) {}

  findOneByWantedGuId({ wantedGuId }) {
    return this.wantedGuRepository.findOne({
      where: {
        id: wantedGuId,
      },
      relations: ['gu'],
    });
  }

  async addWantedGu({ guId, userId }) {
    return this.wantedGuRepository.save({
      gu: { id: guId },
      user: { id: userId },
    });
  }
}
