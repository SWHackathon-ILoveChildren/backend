import { ApiProperty, PickType, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class IUsersServiceSitterFindByParentsUserId {
  parentsUserId: string;
  returnCount?: number;
}

export class IUsersServiceParentsFindBySitterUserId {
  sitterUserId: string;
  returnCount?: number;
}

export class CreateParentsUsers extends PickType(User, [
  'id',
  'name',
  'phoneNum',
  'password',
  'introduction',
  'userType',
  'createdAt',
] as const) {}

export class CreateSitterUsers extends OmitType(CreateParentsUsers, [
  'introduction',
] as const) {
  @ApiProperty({
    example: '안녕하세요. 시니어 시터 홍길동입니다.',
  })
  introduction: string;
}

export class fetchBestSitterUserReturn {
  @ApiProperty({
    example: 'c4b5617e-f8ce-4650-b50a-bb7e09b75ef2',
  })
  sitterUserId: string;

  @ApiProperty({
    example: '홍길동',
  })
  sitterUserName: string;

  @ApiProperty({
    example: '2023-07-31T08:46:05.979Z',
    description: '가입순이 맞는 확인용',
  })
  sitterUserCreatedAt: Date;

  @ApiProperty({
    type: [String],
    example: ['등하원 돌봄', '아픈아이 돌봄'],
  })
  sitterUserCareTypeNames: string[];

  @ApiProperty({
    type: [String],
    example: ['신생아', '영아'],
  })
  sitterUserChildTypeNames: string[];
}

export class FetchUserPhoneNumReturn extends PickType(User, [
  'id',
  'phoneNum',
] as const) {}

export class FetchUserReturn extends OmitType(CreateParentsUsers, [
  'introduction',
] as const) {
  @ApiProperty({
    example: '안녕하세요. 김미나입니다.',
  })
  introduction: string;

  @ApiProperty({
    example: '01012345678',
  })
  contactPhoneNumber: string;
}

export class FetchSitterUsersReturn extends fetchBestSitterUserReturn {}

export class IUsersServiceSitterFindByParentsUserIdReturn extends fetchBestSitterUserReturn {}

export class FetchNearbyJobsReturn {
  @ApiProperty({
    example: 'c4b5617e-f8ce-4650-b50a-bb7e09b75ef2',
  })
  parentsUserId: string;

  @ApiProperty({
    example: '2023-07-31T08:46:05.979Z',
    description: '가입순이 맞는 확인용',
  })
  parentsUserCreatedAt: Date;

  @ApiProperty({
    type: [String],
    example: ['202301', '202111'],
  })
  parentsUserChildren: string[];

  @ApiProperty({
    type: [String],
    example: ['등하원 돌봄', '아픈아이 돌봄'],
  })
  parentsUserCareTypeNames: string[];
}
