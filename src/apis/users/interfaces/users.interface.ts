import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateParentsUsers extends OmitType(User, [
  'childType',
  'profile',
  'childrens',
  'careTypes',
  'wantedGues',
] as const) {}

export class CreateSitterUsers extends OmitType(CreateParentsUsers, [
  'introduction',
] as const) {
  @ApiProperty({
    example: '안녕하세요. 시니어 시터 홍길동입니다.',
  })
  introduction: string;
}
