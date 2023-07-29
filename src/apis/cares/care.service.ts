import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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
    const { childrenId, sitterUserId, ...rest } = createCaresDto;

    const parentsUser = await this.usersService.parentsUserFindOneById({
      parentsUserId,
    });

    const sitterUser = await this.usersService.sitterUserFindOneById({
      sitterUserId,
    });

    const children = await this.childrensService.findOneById({ childrenId });
    if (children.user.id !== parentsUserId)
      throw new UnprocessableEntityException(
        '아이의 정보가 올바르지 않습니다.'
      );

    if (
      parentsUser.userType === 'PARENTS' &&
      sitterUser.userType === 'SITTER'
    ) {
      await this.caresRepository.save({
        ...rest,
        careStatus: STATUS_TYPE_ENUM.SCHEDULE,
        children,
        parentsUser,
        sitterUser,
      });
    } else {
      throw new UnprocessableEntityException(
        '부모 회원 또는 시니어시터 회원의 정보가 올바르지 않습니다.'
      );
    }
  }
}
