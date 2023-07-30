import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChildType } from './entities/childType.entity';
import { Repository } from 'typeorm';
import { CreateChildTypeDto } from './dto/createChildType.dto';

@Injectable()
export class ChildTypeService {
  constructor(
    @InjectRepository(ChildType)
    private childTypeRepository: Repository<ChildType>
  ) {}

  async findOne({ name }) {
    const childTypeName = await this.childTypeRepository.findOne({
      where: { name },
    });

    if (childTypeName)
      throw new UnprocessableEntityException('이미 등록된 아이 타입입니다.');
  }

  async create(createChildTypeDto: CreateChildTypeDto) {
    await this.findOne({ name: createChildTypeDto.name });
    return await this.childTypeRepository.save({ ...createChildTypeDto });
  }
}
