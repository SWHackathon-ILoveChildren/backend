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

    const parentsUser = await this.usersService.parentsUserFindOneById({
      parentsUserId,
    });

    // const sitterUser = await this.usersService.
    const children = await this.childrensService.findOneById({ childrenId });

    if (parentsUser.userType === 'PARENTS') {
      // await this.caresRepository.save({
      //   ...rest,
      //   careStatus: STATUS_TYPE_ENUM.SCHEDULE,
      //   children,
      //   parentsUser,
      //   sitterUser:
      // });
    }
  }
}
