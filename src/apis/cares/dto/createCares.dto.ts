import { ApiProperty, PickType } from '@nestjs/swagger';
import { Care } from '../entities/care.entity';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCaresByParentsUserDto extends PickType(Care, [
  'date',
  'startTime',
  'endTime',
] as const) {
  @ApiProperty({
    example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  sitterUserId: string;

  @ApiProperty({
    example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  childrenId: string;

  @ApiProperty({
    description:
      '회원가입 시 진행한 휴대폰 번호와 시터와 소통할 휴대폰 번호가 다를 경우 기입',
    example: '01012345678',
    required: false,
  })
  @IsString()
  contactPhoneNumber?: string;
}
