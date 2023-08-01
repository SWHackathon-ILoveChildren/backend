import { ApiProperty } from '@nestjs/swagger';
import { STATUS_TYPE_ENUM } from '../types/status.type';
import { CreateCaresDto } from '../dto/createCares.dto';

export class ICareServiceCreate {
  @ApiProperty({
    example: 'c4b5617e-f8ce-4650-b50a-bb7e09b75ef2',
  })
  parentsUserId: string;

  createCaresDto: CreateCaresDto;
}

export class CreateCareReturn {
  @ApiProperty({
    example: 'c4b5617e-f8ce-4650-b50a-bb7e09b75ef2',
  })
  id: string;

  @ApiProperty({
    example: '2023-08-07',
  })
  date: string;

  @ApiProperty({
    example: '09:00',
  })
  startTime: string;

  @ApiProperty({
    example: '18:00',
  })
  endTime: string;

  @ApiProperty({
    example: 'SCHEDULE',
  })
  status: STATUS_TYPE_ENUM.SCHEDULE;
}
