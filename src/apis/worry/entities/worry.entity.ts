import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { WORRY_TYPE_ENUM } from '../types/worry.type';
import { User } from 'src/apis/users/entities/user.entity';

@Entity()
export class Worry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  contents: string;

  @Column({ type: 'enum', enum: WORRY_TYPE_ENUM })
  worryType: string;

  @ManyToOne(() => User)
  user: User;
}
