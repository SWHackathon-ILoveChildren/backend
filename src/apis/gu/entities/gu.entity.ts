import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gu {
  @ApiProperty({
    example: '1',
  })
  @IsNumber()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({
    example: '강남구',
  })
  @Column()
  name: string;
}
