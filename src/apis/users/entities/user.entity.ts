import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { USER_TYPE_ENUM } from '../types/user.type';
import { CARE_TYPE_ENUM } from '../types/care.type';
import { CHILD_TYPE_ENUM } from '../types/child.type';
import { Profile } from 'src/apis/profiles/entities/profile.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({
    example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '김미나',
    required: true,
  })
  @Column()
  name: string;

  @ApiProperty({
    example: '안녕하세요. 2살 남아 엄마 김미나입니다.',
  })
  @Column()
  introduction: string;

  @ApiProperty({
    example: 'abc123',
    required: true,
  })
  @Column()
  password: string;

  @ApiProperty({
    example: '01012345678',
    required: true,
  })
  @Column()
  phoneNum: string;

  @ApiProperty({
    example: 'PARENTS',
    description: 'PARENTS: 부모 회원, SITTER: 시니어시터 회원',
    required: true,
    type: 'enum',
  })
  @Column({ type: 'enum', enum: USER_TYPE_ENUM })
  userType: string;

  @ApiProperty({
    example: 'ONETIME',
    description:
      'GOBACK: 등하원 돌봄, SICKCHILD: 아픈아이 돌봄, ONETIME: 일회성 돌봄, ACTIVITYSUPPORT: 모임활동 지원',
    required: true,
    type: 'enum',
  })
  @Column({ type: 'enum', enum: CARE_TYPE_ENUM })
  careType: string;

  @ApiProperty({
    example: 'INFANONETIMET',
    description:
      'INFANONETIMET: 신생아, INFANT: 영아, KID: 유아, ELEMENTARY: 초등학생',
    required: true,
    type: 'enum',
  })
  @Column({ type: 'enum', enum: CHILD_TYPE_ENUM })
  childType: string;

  @ApiProperty({
    example: 'profile: { id: 0dc011aa-d76e-11ed-afa1-0242ac120002 }',
    description: '부모회원으로 가입하기에서는 profile을 사용하지 않습니다.',
  })
  @OneToOne(() => Profile)
  profile?: Profile;
}
