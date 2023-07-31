import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
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
import { UserChildTypesService } from '../userChildType/userChileTypes.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private childrenService: ChildrenService,
    private guService: GuService,
    private wantedGuService: WantedGuService,
    private caresService: CaresService,
    private userChildTypesService: UserChildTypesService
  ) {}

  async parentsUserFindOneById({ parentsUserId }) {
    const parentsUser = await this.usersRepository.findOne({
      where: { id: parentsUserId },
      relations: ['wantedGues', 'careTypes', 'userChildTypes'],
    });

    if (!parentsUser)
      throw new UnprocessableEntityException('존재하지 않는 유저입니다.');

    return parentsUser;
  }

  async sitterUserFindOneById({ sitterUserId }) {
    const sitterUser = await this.usersRepository.findOne({
      where: { id: sitterUserId },
      relations: ['cares', 'careTypes', 'userChildTypes'],
    });

    if (!sitterUser)
      throw new UnprocessableEntityException('존재하지 않는 유저입니다.');

    return sitterUser;
  }

  async findOneByPhoneNum({ phoneNum }) {
    return await this.usersRepository.findOne({
      where: { phoneNum },
    });
  }

  async bestSitterFindAllByParentsUserId({ parentsUserId }) {
    const parentsUser = await this.parentsUserFindOneById({ parentsUserId });

    if (!parentsUser || parentsUser.userType !== 'PARENTS')
      throw new UnprocessableEntityException('부모 유저를 찾을 수 없습니다.');

    const wantedGuId = parentsUser.wantedGues[0].id;

    const wantedGu = await this.wantedGuService.findOneByWantedGuId({
      wantedGuId,
    });

    if (!wantedGu)
      throw new UnprocessableEntityException('원하는 구를 찾을 수 없습니다.');

    const sitterUsers = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.wantedGues', 'wantedGu')
      // .leftJoinAndSelect('user.careTypes', 'careType')
      // .leftJoinAndSelect('user.userChildTypes', 'userChildType')
      // .leftJoinAndSelect('userChildType.childTypes', 'childType')
      .where('user.userType = :userType', { userType: 'SITTER' })
      .andWhere('wantedGu.gu = :gu', { gu: wantedGu.gu.id })
      .orderBy('user.createdAt', 'ASC')
      .take(3)
      .getMany();

    await Promise.all(
      sitterUsers.map(async (sitterUser) => {
        // careType DB에서 찾아오기
        // sitterUser.careTypes = await this.careType;
        // userChildType DB에서 찾아오기
      })
    );

    console.log(sitterUsers);
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

    // 부모 회원이 원하는 돌봄 타입 저장 로직
    if (careTypes.length > 0) {
      parentsCareType = await this.caresService.addCareType({
        careTypes,
        userId: user.id,
      });
    }

    // 부모 회원 아이 추가 로직
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

    return user;
  }

  async createSitter(createSittersDto) {
    const {
      phoneNum,
      password,
      userType,
      careTypes,
      wantedGuName,
      childTypeIds,
      ...rest
    } = createSittersDto;

    const userCheck = await this.findOneByPhoneNum({ phoneNum });
    if (userCheck)
      throw new ConflictException('이미 등록된 휴대폰 번호입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);

    // enum 타입 검증
    this.isValidUserType({ userType });

    const user = await this.usersRepository.save({
      ...rest,
      phoneNum,
      password: hashedPassword,
      userType,
    });

    // 시니어시터 회원이 원하는 돌봄 타입 저장 타입
    if (careTypes.length > 0) {
      await this.caresService.addCareType({
        careTypes,
        userId: user.id,
      });
    }

    // 시니어시터 회원이 돌봄 하길 원하는 지역
    const wantedGu = await this.guService.findByWantedGuName({ wantedGuName });
    await this.wantedGuService.addWantedGu({
      guId: wantedGu.id,
      userId: user.id,
    });

    await this.userChildTypesService.addUserChildType({
      childTypeIds,
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
