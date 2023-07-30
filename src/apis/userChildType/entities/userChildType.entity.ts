import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { ChildType } from 'src/apis/childTypes/entities/childType.entity';
import { User } from 'src/apis/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserChildType {
  @ApiProperty({
    example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
  })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    type: () => [User],
    example:
      'users: [{ id: 0ab0d27a-2d34-4bda-a936-29454f014612, users:{ id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }}, { id: 889675ad-e3fe-4fe1-ad0d-6b06f5447f41, users: { id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }}]',
  })
  @ManyToOne(() => User, (users) => users.userChildTypes)
  users: User;

  @ApiProperty({
    type: () => [ChildType],
    example:
      'childTypes: [{ id: 0ab0d27a-2d34-4bda-a936-29454f014612, childTypes:{ id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }}, { id: 889675ad-e3fe-4fe1-ad0d-6b06f5447f41, childTypes: { id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }}]',
  })
  @ManyToOne(() => ChildType, (childTypes) => childTypes.userChildTypes)
  childTypes: ChildType;
}
