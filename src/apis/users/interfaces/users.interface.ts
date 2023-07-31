import { ApiProperty, PickType, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

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
