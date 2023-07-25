import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { USER_TYPE_ENUM } from '../types/user.type';
import { CARE_TYPE_ENUM } from '../types/care.type';
import { CHILD_TYPE_ENUM } from '../types/child.type';
import { Profile } from 'src/apis/profiles/entities/profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  introduction: string;

  @Column()
  password: string;

  @Column()
  phoneNum: string;

  @Column({ type: 'enum', enum: USER_TYPE_ENUM })
  userType: string;

  @Column({ type: 'enum', enum: CARE_TYPE_ENUM })
  careType: string;

  @Column({ type: 'enum', enum: CHILD_TYPE_ENUM })
  childType: string;

  @OneToOne(() => Profile)
  profile: Profile;
}
