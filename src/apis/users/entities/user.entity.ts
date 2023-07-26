import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { USER_TYPE_ENUM } from '../types/user.type';
import { CHILD_TYPE_ENUM } from '../types/child.type';
import { Profile } from 'src/apis/profiles/entities/profile.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { Children } from 'src/apis/children/entities/children.entity';
import { CareType } from 'src/apis/careType/entities/careType.entity';

@Entity()
export class User {
  @ApiProperty({
    example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
  })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '김미나',
    required: false,
  })
  @IsString()
  @Column({ nullable: true })
  name?: string;

  @ApiProperty({
    example: '안녕하세요. 2살 남아 엄마 김미나입니다.',
  })
  @IsString()
  @Column()
  introduction: string;

  @ApiProperty({
    example: 'abc123',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  password: string;

  @ApiProperty({
    example: '01012345678',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  phoneNum: string;

  @ApiProperty({
    example: USER_TYPE_ENUM.PARENTS,
    description: '회원 유형 (PARENTS: 부모 회원, SITTER: 시니어시터 회원)',
    required: true,
    enum: USER_TYPE_ENUM,
  })
  @IsNotEmpty()
  @IsEnum(USER_TYPE_ENUM)
  @Column({ type: 'enum', enum: USER_TYPE_ENUM })
  userType: USER_TYPE_ENUM;

  @ApiProperty({
    example: CHILD_TYPE_ENUM.INFANT,
    description:
      '아이 유형 (INFANONETIMET: 신생아, INFANT: 영아, KID: 유아, ELEMENTARY: 초등학생)',
    required: true,
    enum: CHILD_TYPE_ENUM,
  })
  @Column({ type: 'enum', enum: CHILD_TYPE_ENUM })
  childType: CHILD_TYPE_ENUM;

  @ApiProperty({
    example: 'profile: { id: 0dc011aa-d76e-11ed-afa1-0242ac120002 }',
    description: '부모회원으로 가입하기에서는 profile을 사용하지 않습니다.',
  })
  @OneToOne(() => Profile)
  profile?: Profile;

  @ApiProperty({
    example:
      'childrens: [{ birth: 199801, user:{ id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }, id: 0ab0d27a-2d34-4bda-a936-29454f014612 }, { birth: 200003, user: { id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }, id: 889675ad-e3fe-4fe1-ad0d-6b06f5447f41 }]',
  })
  @OneToMany(() => Children, (childrens) => childrens.user)
  childrens: Children[];

  @ApiProperty({
    example:
      'careTypes: [{ name: 등하원 돌봄, user:{ id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }, id: 0ab0d27a-2d34-4bda-a936-29454f014612 }, { 아픈아이 돌봄: 200003, user: { id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }, id: 889675ad-e3fe-4fe1-ad0d-6b06f5447f41 }]',
    required: true,
  })
  @OneToMany(() => CareType, (careTypes) => careTypes.user)
  careTypes: CareType[];
}
