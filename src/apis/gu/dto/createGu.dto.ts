import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGuDto {
  @ApiProperty({
    example: '강남구',
  })
  @IsString()
  name: string;
}
