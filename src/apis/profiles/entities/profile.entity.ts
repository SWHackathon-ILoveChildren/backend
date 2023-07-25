import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @ApiProperty({
    example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '3',
  })
  @Column()
  careCounting: number;

  @ApiProperty({
    example: '5',
  })
  @Column()
  worryAnswerCounting: number;

  @JoinColumn()
  @OneToOne(() => User)
  user: User;
}
