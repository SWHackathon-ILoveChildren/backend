import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CHILD_TYPE_ENUM } from '../types/child.type';
import { User } from 'src/apis/users/entities/user.entity';

@Entity()
export class Children {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brith: string;

  @Column({ type: 'enum', enum: CHILD_TYPE_ENUM })
  childType: string;

  @ManyToOne(() => User)
  user: User;
}
