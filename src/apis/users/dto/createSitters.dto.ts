import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateParentsDto } from './createParents.dto';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { USER_TYPE_ENUM } from '../types/user.type';

export class CreateSittersDto extends PickType(CreateParentsDto, [
  'phoneNum',
  'password',
  'careTypes',
] as const) {
  @ApiProperty({
    example: '홍길동',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '안녕하세요. 시니어 시터 홍길동입니다.',
  })
  @IsString()
  introduction: string;

  @ApiProperty({
    example: '강동구',
  })
  @IsString()
  wantedGuName: string;

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
    description: '1: 신생아 / 2: 영아 / 3: 유아 / 4: 초등학생',
    example: ['1', '2'],
  })
  @IsUUID()
  childTypeIds: [string];
}
