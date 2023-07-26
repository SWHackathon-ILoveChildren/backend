import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { USER_TYPE_ENUM } from './types/user.type';
import { CARE_TYPE_ENUM } from './types/care.type';
import { ChildrenService } from '../children/children.service';
import { GuService } from '../gu/gu.service';
import { WantedGuService } from '../wantedGu/watnedGu.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private childrenService: ChildrenService,
    private guService: GuService,
    private wantedGuService: WantedGuService
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
      careType,
      childrenBirths,
      wantedGuName,
      ...rest
    } = createUserDto;
    let parentsChildren = null;

    const userCheck = await this.findOneByPhoneNum({ phoneNum });
    if (userCheck) throw new ConflictException('이미 등록된 이메일입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);

    this.isValidUserType({ userType });
    this.isValidCareType({ careType });

    const user = await this.usersRepository.save({
      ...rest,
      phoneNum,
      password: hashedPassword,
      userType,
      careType,
    });

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
      parentsChildren,
    });
  }

  // 유저 타입 검증
  isValidUserType({ userType }) {
    const typeCheck = Object.values(USER_TYPE_ENUM).includes(userType);

    if (!typeCheck)
      throw new ConflictException('유효하지 않은 유저 타입입니다.');
  }

  // 돌봄 타입 검증
  isValidCareType({ careType }) {
    const careCheck = Object.values(CARE_TYPE_ENUM).includes(careType);

    if (!careCheck)
      throw new ConflictException('유효하지 않은 돌봄 타입입니다.');
  }

  // 아이 타입 검증
  isValidChildType({ childType }) {
    const childCheck = Object.values(CARE_TYPE_ENUM).includes(childType);

    if (!childCheck)
      throw new ConflictException('유효하지 않은 아이 타입입니다.');
  }
}
