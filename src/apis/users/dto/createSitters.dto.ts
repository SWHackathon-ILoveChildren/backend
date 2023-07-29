import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateParentsDto } from './createParents.dto';
import { CHILD_TYPE_ENUM } from '../types/child.type';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { USER_TYPE_ENUM } from '../types/user.type';

export class CreateSittersDto extends PickType(CreateParentsDto, [
  'phoneNum',
  'password',
  'careTypes',
  'wantedGuName',
] as const) {
  @ApiProperty({
    example: '안녕하세요. 시니어 시터 홍길동입니다.',
  })
  @IsString()
  introduction: string;

  @ApiProperty({
    example: USER_TYPE_ENUM.SITTER,
    description: '회원 유형 (PARENTS: 부모 회원, SITTER: 시니어시터 회원)',
    required: true,
    enum: USER_TYPE_ENUM,
  })
  @IsNotEmpty()
  @IsEnum(USER_TYPE_ENUM)
  userType: USER_TYPE_ENUM;

  @ApiProperty({
    example: CHILD_TYPE_ENUM.INFANT,
    description:
      '아이 유형 (INFANONETIMET: 신생아, INFANT: 영아, KID: 유아, ELEMENTARY: 초등학생)',
    required: true,
    enum: CHILD_TYPE_ENUM,
  })
  childType: CHILD_TYPE_ENUM;
}
