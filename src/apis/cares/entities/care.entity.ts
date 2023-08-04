import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Children } from 'src/apis/children/entities/children.entity';
import { STATUS_TYPE_ENUM } from 'src/apis/cares/types/status.type';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { USER_TYPE_ENUM } from '../types/user.type';

@Entity()
export class Care {
  @ApiProperty({
    example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
    required: true,
  })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'PARENTS',
    type: 'enum',
    required: true,
  })
  @IsEnum(USER_TYPE_ENUM)
  @IsNotEmpty()
  @Column({ type: 'enum', enum: USER_TYPE_ENUM })
  whoApplied: USER_TYPE_ENUM;

  @ApiProperty({
    example: '2023-07-28',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  date: string;

  @ApiProperty({
    example: '09:00',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  startTime: string;

  @ApiProperty({
    example: '18:00',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Column()
  endTime: string;

  @ApiProperty({
    example: 'SCHEDULE',
    type: 'enum',
    required: true,
  })
  @IsEnum(STATUS_TYPE_ENUM)
  @IsNotEmpty()
  @Column({ type: 'enum', enum: STATUS_TYPE_ENUM })
  careStatus: STATUS_TYPE_ENUM;

  @ApiProperty({
    example: '2023-07-28T06:48:36.266Z',
  })
  @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: null,
  })
  @IsDate()
  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  @ApiProperty({
    type: () => Children,
    example: 'children: { id: 0dc011aa-d76e-11ed-afa1-0242ac120002 }',
  })
  @ManyToOne(() => Children)
  children: Children;

  @ApiProperty({
    type: () => User,
    example: 'user: { id: 0dc011aa-d76e-11ed-afa1-0242ac120002 }',
  })
  @ManyToOne(() => User)
  parentsUser: User;

  @ApiProperty({
    type: () => User,
    example: 'user: { id: 0dc011aa-d76e-11ed-afa1-0242ac120002 }',
  })
  @ManyToOne(() => User)
  sitterUser: User;
}
