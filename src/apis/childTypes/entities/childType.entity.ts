import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UserChildType } from 'src/apis/userChildType/entities/userChildType.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ChildType {
  @ApiProperty({
    example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
  })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '신생아',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty({
    type: () => [UserChildType],
    example:
      'userChildTypes: [{ id: 0ab0d27a-2d34-4bda-a936-29454f014612, childTypes:{ id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }}, { id: 889675ad-e3fe-4fe1-ad0d-6b06f5447f41, childTypes: { id: 665a22a7-d465-4cf4-a27c-f8366c2ff83f }}]',
  })
  @OneToMany(() => UserChildType, (userChildTypes) => userChildTypes.childTypes)
  userChildTypes: UserChildType;
}
