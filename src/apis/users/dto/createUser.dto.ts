import { ApiProperty, OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateUserDto extends OmitType(User, [
  'id',
  'profile',
  'childrens',
] as const) {
  @ApiProperty({
    type: '[string]',
    example: ['199701', '200003'],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  childrenBirths: string[];
}
