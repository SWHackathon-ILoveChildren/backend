import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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

  async findOne({ name }) {
    const guName = await this.guRepository.findOne({ where: { name } });

    if (guName) throw new UnprocessableEntityException('이미 등록된 구입니다.');
  }

  async findByWantedGuName({ wantedGuName }: { wantedGuName: string }) {
    return await this.guRepository.findOne({
      where: {
        name: wantedGuName,
      },
    });
  }

  async create(createGuDto: CreateGuDto): Promise<Gu> {
    await this.findOne({ name: createGuDto.name });
    return await this.guRepository.save({ ...createGuDto });
  }
}
