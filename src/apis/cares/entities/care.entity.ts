import { Children } from 'src/apis/childen/entities/children.entity';
import { Profile } from 'src/apis/profiles/entities/profile.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Care {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startDate: string;

  @Column()
  endDate: string;

  @ManyToOne(() => Children)
  children: Children;

  @ManyToOne(() => Profile)
  profile: Profile;
}
