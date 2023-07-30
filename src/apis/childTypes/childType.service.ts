import { Injectable } from '@nestjs/common';
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

  async create({ createChildTypeDto }: CreateChildTypeDto) {
    // await this.findOne/
  }
}
