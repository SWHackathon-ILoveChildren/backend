import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { USER_TYPE_ENUM } from './types/user.type';
import { ChildrenService } from '../children/children.service';
import { GuService } from '../gu/gu.service';
import { WantedGuService } from '../wantedGu/watnedGu.service';
import { CaresService } from '../careType/careTypes.service';
import { CHILD_TYPE_ENUM } from './types/child.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private childrenService: ChildrenService,
    private guService: GuService,
    private wantedGuService: WantedGuService,
    private caresService: CaresService
  ) {}

  async findOneByPhoneNum({ phoneNum }) {
    return await this.usersRepository.findOne({
      where: { phoneNum },
    });
  }

  async createParent(createUserDto) {
    const {
      phoneNum,
      password,
      userType,
      careTypes,
      childrenBirths,
      wantedGuName,
      ...rest
    } = createUserDto;
    let parentsChildren = null;
    let parentsCareType = null;

    const userCheck = await this.findOneByPhoneNum({ phoneNum });
    if (userCheck)
      throw new ConflictException('이미 등록된 휴대폰 번호입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);

    this.isValidUserType({ userType });

    const user = await this.usersRepository.save({
      ...rest,
      phoneNum,
      password: hashedPassword,
      userType,
    });

    if (careTypes.length > 0) {
      parentsCareType = await this.caresService.addCareType({
        careTypes,
        userId: user.id,
      });
    }

    // 부모 회원 아이 추가 로직
    if (userType === 'PARENTS') {
      if (childrenBirths.length > 0) {
        parentsChildren = await this.childrenService.addChildren({
          childrenBirths,
          userId: user.id,
        });
      }

      // 부모 회원 돌봄 받길 원하는 지역
      const wantedGu = await this.guService.findByWantedGuName(wantedGuName);

      await this.wantedGuService.addWantedGu({
        guId: wantedGu.id,
        userId: user.id,
      });
    }

    return await this.usersRepository.save({
      ...user,
    });
  }

  async createSitter(createSittersDto) {
    const {
      phoneNum,
      password,
      userType,
      careTypes,
      wantedGuName,
      childType,
      ...rest
    } = createSittersDto;

    const userCheck = await this.findOneByPhoneNum({ phoneNum });
    if (userCheck)
      throw new ConflictException('이미 등록된 휴대폰 번호입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);

    // enum 타입 검증
    this.isValidUserType({ userType });
    this.isValidChildType({ childType });

    const user = await this.usersRepository.save({
      ...rest,
      phoneNum,
      password: hashedPassword,
      userType,
    });

    // 시터 케어 타입
    if (careTypes.length > 0) {
      await this.caresService.addCareType({
        careTypes,
        userId: user.id,
      });
    }

    // 시터 활동 지역
    const wantedGu = await this.guService.findByWantedGuName(wantedGuName);

    await this.wantedGuService.addWantedGu({
      guId: wantedGu.id,
      userId: user.id,
    });

    return user;
  }

  // 유저 타입 검증
  isValidUserType({ userType }) {
    const typeCheck = Object.values(USER_TYPE_ENUM).includes(userType);

    if (!typeCheck)
      throw new ConflictException('유효하지 않은 유저 타입입니다.');
  }

  // 아이 타입 검증
  isValidChildType({ childType }) {
    const childCheck = Object.values(CHILD_TYPE_ENUM).includes(childType);

    if (!childCheck)
      throw new ConflictException('유효하지 않은 아이 타입입니다.');
  }
}