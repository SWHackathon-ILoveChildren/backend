import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ChildrenService } from '../children/children.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { STATUS_TYPE_ENUM } from './types/status.type';
import {
  CreateCareReturn,
  GetCareReceivedReturn,
  ICareServiceGetCareReceived,
} from './interfaces/cares.interface';
import { Care } from './entities/care.entity';
import { ProfilesService } from '../profiles/profiles.service';
import { USER_TYPE_ENUM } from './types/user.type';

@Injectable()
export class CaresService {
  constructor(
    @InjectRepository(Care)
    private caresRepository: Repository<Care>,

    private usersService: UsersService,
    private childrensService: ChildrenService,
    private profilesService: ProfilesService
  ) {}

  async getCareReceived({
    parentsUserId,
    returnCount,
  }: ICareServiceGetCareReceived): Promise<GetCareReceivedReturn[]> {
    const parentsUserProfile =
      await this.profilesService.findOneByParentsUserId({ parentsUserId });

    const caresRecevied = await this.caresRepository.find({
      where: {
        parentsUser: {
          id: parentsUserId,
        },
        careStatus: STATUS_TYPE_ENUM.COMPLETE,
      },
      relations: ['sitterUser', 'parentsUser', 'children'],
      order: {
        date: 'DESC',
      },
      take: returnCount || undefined,
    });

    const result = caresRecevied.map((careRecevied) => ({
      careId: careRecevied.id,
      allCounting: parentsUserProfile.careCounting,
      sitterName: careRecevied.sitterUser.name,
      date: careRecevied.date,
      startTime: careRecevied.startTime,
      endTime: careRecevied.endTime,
    }));

    return result;
  }

  async createByParentsUser({
    parentsUserId,
    ...createCaresDto
  }): Promise<CreateCareReturn> {
    const { date, childrenId, sitterUserId, contactPhoneNumber, ...rest } =
      createCaresDto;

    const parentsUser = await this.usersService.parentsUserFindOneById({
      parentsUserId,
    });

    // 시터와 소통활 휴대폰 번호가 유저 휴대폰번호랑 다를 경우, 시터와 소통할 휴대폰 번호로 업데이트
    if (parentsUser.phoneNum !== contactPhoneNumber) {
      await this.usersService.updatePhoneNum({
        userId: parentsUser.id,
        phoneNum: contactPhoneNumber,
      });
    }

    const sitterUser = await this.usersService.sitterUserFindOneById({
      sitterUserId,
    });
    sitterUser.cares.map((care) => {
      if (care.date === date)
        throw new UnprocessableEntityException(
          `${date} 날짜에는 돌봄 신청을 할 수 없습니다. 다른 날짜에 돌봄 신청을 해주세요.  `
        );
    });

    const children = await this.childrensService.findOneById({ childrenId });
    if (children.user.id !== parentsUserId)
      throw new UnprocessableEntityException(
        '아이의 정보가 올바르지 않습니다.'
      );

    let saveResult;
    if (
      parentsUser.userType === 'PARENTS' &&
      sitterUser.userType === 'SITTER'
    ) {
      saveResult = await this.caresRepository.save({
        ...rest,
        date,
        careStatus: STATUS_TYPE_ENUM.SCHEDULE,
        children,
        parentsUser,
        sitterUser,
        whoApplied: USER_TYPE_ENUM.PARENTS,
      });
    } else {
      throw new UnprocessableEntityException(
        '부모 회원 또는 시니어시터 회원의 정보가 올바르지 않습니다.'
      );
    }

    const result = {
      id: saveResult.id,
      date: saveResult.date,
      startTime: saveResult.startTime,
      endTime: saveResult.endTime,
      status: saveResult.careStatus,
    };

    return result;
  }

  async createBySitterUser({
    sitterUserId,
    createCaresDto,
  }): Promise<CreateCareReturn> {
    const { date, parentsUserId, contactPhoneNumber, ...rest } = createCaresDto;

    const sitterUser = await this.usersService.sitterUserFindOneById({
      sitterUserId,
    });

    if (sitterUser.phoneNum !== contactPhoneNumber) {
      await this.usersService.updatePhoneNum({
        userId: sitterUser.id,
        phoneNum: contactPhoneNumber,
      });
    }

    const parentsUser = await this.usersService.parentsUserFindOneById({
      parentsUserId,
    });

    const parentsUserChildren = parentsUser.childrens.sort(
      (a, b) => parseInt(a.birth, 10) - parseInt(b.birth, 10)
    );

    sitterUser.cares.map((care) => {
      if (care.date === date)
        throw new UnprocessableEntityException(
          `${date} 날짜에는 돌봄 신청을 할 수 없습니다. 다른 날짜에 돌봄 신청을 해주세요.  `
        );
    });

    let saveResult;
    if (
      parentsUser.userType === 'PARENTS' &&
      sitterUser.userType === 'SITTER'
    ) {
      saveResult = await this.caresRepository.save({
        ...rest,
        date,
        careStatus: STATUS_TYPE_ENUM.SCHEDULE,
        children: parentsUserChildren[0].id,
        sitterUser,
        parentsUser,
        whoApplied: USER_TYPE_ENUM.SITTER,
      });
    } else {
      throw new UnprocessableEntityException(
        '부모 회원 또는 시니어시터 회원의 정보가 올바르지 않습니다.'
      );
    }

    const result = {
      id: saveResult.id,
      date: saveResult.date,
      startTime: saveResult.startTime,
      endTime: saveResult.endTime,
      status: saveResult.careStatus,
    };

    return result;
  }

  async updateToCompleteCare({ careId }: { careId: string }) {
    const care = await this.caresRepository.findOne({
      where: {
        id: careId,
      },
      relations: ['sitterUser', 'parentsUser'],
    });

    if (!care)
      throw new UnprocessableEntityException('돌봄 정보가 올바르지 않습니다.');

    if (care.careStatus !== 'SCHEDULE') {
      throw new UnprocessableEntityException(
        'SCHEDULE 상태의 돌봄 신청만 COMPLETE 상태로 수정할 수 있습니다.'
      );
    }

    await this.profilesService.addCareCounting({
      sitterUserId: care.sitterUser.id,
    });

    await this.profilesService.addCareCountingByParentsUserId({
      parentsUserId: care.parentsUser.id,
    });

    await this.caresRepository.update(
      { id: care.id },
      { careStatus: STATUS_TYPE_ENUM.COMPLETE }
    );

    return '돌봄 완료 상태로 업데이트 성공';
  }

  async updateToCancel({ careId }: { careId: string }): Promise<string> {
    const care = await this.caresRepository.findOne({
      where: {
        id: careId,
      },
      relations: ['sitterUser', 'parentsUser'],
    });

    if (!care)
      throw new UnprocessableEntityException('돌봄 정보가 올바르지 않습니다.');

    if (care.careStatus !== 'SCHEDULE') {
      throw new UnprocessableEntityException(
        'SCHEDULE 상태의 돌봄 신청만 CANCEL 상태로 수정할 수 있습니다.'
      );
    }

    await this.caresRepository.update(
      { id: care.id },
      { careStatus: STATUS_TYPE_ENUM.CANCEL }
    );

    await this.caresRepository.softDelete(care.id);

    return '돌봄 취소 상태로 업데이트 성공';
  }

  async updateToProblem({ careId }: { careId: string }): Promise<string> {
    const care = await this.caresRepository.findOne({
      where: {
        id: careId,
      },
      relations: ['sitterUser', 'parentsUser'],
    });

    if (!care)
      throw new UnprocessableEntityException('돌봄 정보가 올바르지 않습니다.');

    if (care.careStatus !== 'SCHEDULE') {
      throw new UnprocessableEntityException(
        'SCHEDULE 상태의 돌봄 신청만 PROBLEM 상태로 수정할 수 있습니다.'
      );
    }

    await this.caresRepository.update(
      { id: care.id },
      { careStatus: STATUS_TYPE_ENUM.PROBLEM }
    );

    await this.caresRepository.softDelete(care.id);

    return '돌봄 진행 못함 상태로 업데이트 성공';
  }
}
