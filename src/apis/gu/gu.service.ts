import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gu } from 'src/apis/gu/entities/gu.entity';
import { CreateGuDto } from './dto/createGu.dto';

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

  async create(createGuDto: CreateGuDto): Promise<Gu> {
    return await this.guRepository.save({ ...createGuDto });
  }
}
