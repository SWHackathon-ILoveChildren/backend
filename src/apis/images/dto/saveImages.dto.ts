import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SaveImagesDto {
  @ApiProperty({
    example:
      'https://storage.googleapis.com/karuru-storage/2023-08-02/5b677e6d-5cf0-49f1-bb6a-c42db0e62e35/3.png',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  url: string;
}
