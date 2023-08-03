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
import { CareTypesService } from '../careType/careTypes.service';
import { CHILD_TYPE_ENUM } from './types/child.type';
import { UserChildTypesService } from '../userChildType/userChileTypes.service';
import {
  FetchSitterUserReturn,
  FetchUserPhoneNumReturn,
  IUsersServiceParentsFindBySitterUserId,
  IUsersServiceParentsFindBySitterUserIdReturn,
  IUsersServiceSitterFindByParentsUserId,
  IUsersServiceSitterFindByParentsUserIdReturn,
} from './interfaces/users.interface';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private childrenService: ChildrenService,
    private guService: GuService,
    private wantedGuService: WantedGuService,
    private careTypesService: CareTypesService,
    private userChildTypesService: UserChildTypesService,
    private profilesService: ProfilesService
  ) {}

  async parentsUserFindOneById({ parentsUserId }) {
    const parentsUser = await this.usersRepository.findOne({
      where: { id: parentsUserId },
      relations: ['wantedGues', 'careTypes', 'userChildTypes', 'childrens'],
    });

    if (!parentsUser)
      throw new UnprocessableEntityException('존재하지 않는 유저입니다.');

    return parentsUser;
  }

  async sitterUserFindOneById({ sitterUserId }) {
    const sitterUser = await this.usersRepository.findOne({
      where: { id: sitterUserId },
      relations: ['wantedGues', 'cares', 'careTypes', 'userChildTypes'],
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

  async findOneByUserId({
    userId,
  }: {
    userId: string;
  }): Promise<FetchUserPhoneNumReturn> {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user)
      throw new UnprocessableEntityException('존재하지 않는 유저입니다.');

    const result = {
      id: user.id,
      phoneNum: user.phoneNum,
    };

    return result;
  }

  async findOneBysitterUserId({
    sitterUserId,
  }: {
    sitterUserId: string;
  }): Promise<FetchSitterUserReturn> {
    const sitterProfile = await this.profilesService.findOneBySitterUserId({
      sitterUserId,
    });

    const sitter = await this.usersRepository.findOne({
      where: {
        id: sitterUserId,
      },
      relations: [
        'wantedGues',
        'wantedGues.gu',
        'careTypes',
        'userChildTypes',
        'userChildTypes.childTypes',
        'images',
      ],
    });

    const sitterArrary = [sitter];

    const sitterInfo = sitterArrary.map((el) => ({
      careType: el.careTypes.map((careType) => careType.name),
      ChildType: el.userChildTypes.map(
        (childType) => childType.childTypes.name
      ),
    }));

    const result = {
      sitterUserId: sitter.id,
      sitterUserWantedGu: sitter.wantedGues[0].gu.name,
      sitterUserName: sitter.name,
      sitterUserCareCounting: sitterProfile.careCounting,
      sitterUserImage: sitter.images[0].url,
      sitterUserIntroduction: sitter.introduction,
      sitterUserCareTypeNames: sitterInfo[0].careType,
      sitterUserChildTypeNames: sitterInfo[0].ChildType,
    };

    return result;
  }

  async sitterFindByParentsUserId({
    parentsUserId,
    returnCount,
  }: IUsersServiceSitterFindByParentsUserId): Promise<
    IUsersServiceSitterFindByParentsUserIdReturn[]
  > {
    const parentsUser = await this.parentsUserFindOneById({ parentsUserId });

    if (!parentsUser || parentsUser.userType !== 'PARENTS') {
      throw new UnprocessableEntityException('부모 유저를 찾을 수 없습니다.');
    }

    const wantedGuId = parentsUser.wantedGues[0].id;

    const wantedGu = await this.wantedGuService.findOneByWantedGuId({
      wantedGuId,
    });

    if (!wantedGu) {
      throw new UnprocessableEntityException('원하는 구를 찾을 수 없습니다.');
    }

    const sitterUsers = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.wantedGues', 'wantedGu')
      .leftJoinAndSelect('user.careTypes', 'careType')
      .leftJoinAndSelect('user.userChildTypes', 'userChildType')
      .leftJoinAndSelect('userChildType.childTypes', 'childType')
      .where('user.userType = :userType', { userType: 'SITTER' })
      .andWhere('wantedGu.gu = :gu', { gu: wantedGu.gu.id })
      .orderBy('user.createdAt', 'ASC')
      .take(returnCount || 0)
      .getMany();

    const sitterUserIds = sitterUsers.map((sitterUser) => {
      const sitterUserInfo = {
        sitterUserId: sitterUser.id,
        sitterUserName: sitterUser.name,
        sitterUserCreatedAt: sitterUser.createdAt,
        sitterUserCareType: sitterUser.careTypes,
        sitterUserChildType: sitterUser.userChildTypes,
      };
      return sitterUserInfo;
    });

    const result = sitterUserIds.map((el) => ({
      sitterUserId: el.sitterUserId,
      sitterUserName: el.sitterUserName,
      sitterUserCreatedAt: el.sitterUserCreatedAt,
      sitterUserCareTypeNames: el.sitterUserCareType.map(
        (careType) => careType.name
      ),
      sitterUserChildTypeNames: el.sitterUserChildType.map(
        (childType) => childType.childTypes.name
      ),
    }));

    return result;
  }

  async parentsFindBySitterUserId({
    sitterUserId,
    returnCount,
  }: IUsersServiceParentsFindBySitterUserId): Promise<
    IUsersServiceParentsFindBySitterUserIdReturn[]
  > {
    const sitterUser = await this.sitterUserFindOneById({ sitterUserId });

    if (!sitterUser || sitterUser.userType !== 'SITTER') {
      throw new UnprocessableEntityException('시터 유저를 찾을 수 없습니다.');
    }

    console.log(sitterUser);
    const wantedGuId = sitterUser.wantedGues[0].id;

    const wantedGu = await this.wantedGuService.findOneByWantedGuId({
      wantedGuId,
    });

    if (!wantedGu) {
      throw new UnprocessableEntityException('원하는 구를 찾을 수 없습니다.');
    }

    const parentsUsers = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoin('user.wantedGues', 'wantedGu')
      .leftJoinAndSelect('user.careTypes', 'careType')
      .leftJoinAndSelect('user.userChildTypes', 'userChildType')
      .leftJoinAndSelect('user.childrens', 'children')
      .where('user.userType = :userType', { userType: 'PARENTS' })
      .andWhere('wantedGu.gu = :gu', { gu: wantedGu.gu.id })
      .orderBy('user.createdAt', 'ASC')
      .take(returnCount || 0)
      .getMany();

    const parentsUserIds = parentsUsers.map((parentsUser) => {
      const parentsUserInfo = {
        parentsUserId: parentsUser.id,
        parentsUserCreatedAt: parentsUser.createdAt,
        parentsUserChildren: parentsUser.childrens,
        parentsUserCareType: parentsUser.careTypes,
      };
      return parentsUserInfo;
    });

    const result = parentsUserIds.map((el) => ({
      parentsUserId: el.parentsUserId,
      parentsUserCreatedAt: el.parentsUserCreatedAt,
      parentsUserChildren: el.parentsUserChildren.map(
        (children) => children.birth
      ),
      parentsUserCareTypeNames: el.parentsUserCareType.map(
        (careType) => careType.name
      ),
    }));

    return result;
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
      parentsCareType = await this.careTypesService.addCareType({
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
    const wantedGu = await this.guService.findByWantedGuName({ wantedGuName });
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
      await this.careTypesService.addCareType({
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

    await this.profilesService.addSitterUser({ sitterUserId: user.id });

    return user;
  }

  async updatePhoneNum({ userId, phoneNum }) {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (user.contactPhoneNumber === null) {
      user.contactPhoneNumber = phoneNum;
      await this.usersRepository.save(user);
    }
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
