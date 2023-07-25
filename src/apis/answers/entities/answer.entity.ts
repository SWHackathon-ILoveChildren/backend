import { User } from 'src/apis/users/entities/user.entity';
import { Worry } from 'src/apis/worry/entities/worry.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  contents: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Worry)
  worry: Worry;
}
