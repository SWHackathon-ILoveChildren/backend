import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/apis/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Children {
  @ApiProperty({
    example: '0ab0d27a-2d34-4bda-a936-29454f014612',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: '태어난 년 4글자와 달 2글자 입력',
    example: '199908',
  })
  @Column()
  birth: string;

  @ApiProperty({
    type: () => User,
    example: 'user: { id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }',
  })
  @ManyToOne(() => User)
  user: User;
}
