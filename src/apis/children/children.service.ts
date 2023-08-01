import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Children } from './entities/children.entity';
import { Repository } from 'typeorm';
import {
  FetchAllChildrenReturn,
  IChildrenAddChildren,
} from './interfaces/children.interface';

@Injectable()
export class ChildrenService {
  constructor(
    @InjectRepository(Children)
    private childrenRepository: Repository<Children>
  ) {}

  async findOneById({ childrenId }: { childrenId: string }): Promise<Children> {
    const children = await this.childrenRepository.findOne({
      where: { id: childrenId },
      relations: ['user'],
    });

    if (!children)
      throw new UnprocessableEntityException('존재하지 않는 유저입니다.');

    return children;
  }

  async findAllByParentsUserId({
    parentsUserId,
  }: {
    parentsUserId: string;
  }): Promise<FetchAllChildrenReturn[]> {
    return await this.childrenRepository.find({
      where: {
        user: {
          id: parentsUserId,
        },
      },
      order: {
        birth: 'ASC',
      },
    });
  }

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
