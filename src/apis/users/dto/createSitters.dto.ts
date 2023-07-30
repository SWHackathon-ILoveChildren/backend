import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreateParentsDto } from './createParents.dto';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
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
    example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
  })
  @IsUUID()
  userChildTypeID: string;
}
