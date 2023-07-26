import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Children } from './entities/children.entity';
import { Repository } from 'typeorm';
import { IChildrenAddChildren } from './interfaces/children.interface';

@Injectable()
export class ChildrenService {
  constructor(
    @InjectRepository(Children)
    private childrenRepository: Repository<Children>
  ) {}

  async addChildren({
    childrenBirths,
    userId,
  }: IChildrenAddChildren): Promise<Children[]> {
    return await this.childrenRepository.save(
      childrenBirths.map((childrenBirth) => ({
        birth: childrenBirth,
        user: { id: userId },
      }))
    );
  }
}
