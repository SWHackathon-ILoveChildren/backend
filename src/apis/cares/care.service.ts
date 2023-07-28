import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ChildrenService } from '../children/children.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Care } from './entities/care.entity';
import { Repository } from 'typeorm';
import { STATUS_TYPE_ENUM } from './types/status.type';

@Injectable()
export class CaresService {
  constructor(
    @InjectRepository(Care)
    private caresRepository: Repository<Care>,

    private usersService: UsersService,
    private childrensService: ChildrenService
  ) {}

  async create({ parentsUserId, ...createCaresDto }) {
    const { childrenId, ...rest } = createCaresDto;

    const parentsUse = await this.usersService.findOneById({ parentsUserId });

    const children = await this.childrensService.findOneById({ childrenId });

    // if (user.userType === 'PARENTS') {
    //   await this.caresRepository.save({
    //     ...rest,
    //     careStatus: STATUS_TYPE_ENUM.SCHEDULE,
    //     children,
    //     user,
    //   });
    // }
  }
}
