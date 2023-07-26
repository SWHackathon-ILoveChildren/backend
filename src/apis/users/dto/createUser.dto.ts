import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateUserDto extends OmitType(User, [
  'id',
  'name',
  'profile',
  'careTypes',
  'childType',
  'childrens',
] as const) {
  @ApiProperty({
    type: '[string]',
    example: ['등하원 돌봄', '아픈아이 돌봄'],
    description:
      '등하원 돌봄, 아픈아이 돌봄, 일회성 돌봄, 모임활동 지원 중 2개까지 선택 가능)',
    required: true,
  })
  careTypes: string[];

  @ApiProperty({
    type: '[string]',
    example: ['199701', '200003'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  childrenBirths: string[];

  @ApiProperty({
    example: '강남구',
  })
  @IsOptional()
  @IsString()
  @IsString({ each: true })
  wantedGuName: string;
}
