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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  careCounting: number;

  @Column()
  worryCounting: number;

  @JoinColumn()
  @OneToOne(() => User)
  user: User;
}
