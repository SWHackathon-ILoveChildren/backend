import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { User } from 'src/apis/users/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Image {
  @ApiProperty({
    example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
  })
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example:
      'https://storage.googleapis.com/karuru-storage/2023-08-02/5b677e6d-5cf0-49f1-bb6a-c42db0e62e35/3.png',
  })
  @IsString()
  @Column()
  url: string;

  @ManyToOne(() => User, (users) => users.images)
  users: User;
}
