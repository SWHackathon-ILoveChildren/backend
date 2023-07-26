import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gu } from 'src/apis/gu/entities/gu.entity';

@Injectable()
export class GuService {
  constructor(
    @InjectRepository(Gu)
    private guRepository: Repository<Gu>
  ) {}

  async findByWantedGuName({ wantedGuName }: { wantedGuName: string }) {
    return await this.guRepository.findOne({
      where: {
        name: wantedGuName,
      },
    });
  }
}
