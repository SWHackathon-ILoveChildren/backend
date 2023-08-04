import { ApiProperty, PickType } from '@nestjs/swagger';
import { STATUS_TYPE_ENUM } from '../types/status.type';
import { CreateCaresByParentsUserDto } from '../dto/createCares.dto';

export class ICareServiceCreate {
  @ApiProperty({
    example: 'c4b5617e-f8ce-4650-b50a-bb7e09b75ef2',
  })
  parentsUserId: string;

  createCaresDto: CreateCaresByParentsUserDto;
}

export class ICareServiceGetCareReceived {
  parentsUserId: string;
  returnCount?: number;
}

export class ICareServiceGetCareRequested {
  sitterUserId: string;
  returnCount?: number;
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

export class GetCareReceivedReturn extends PickType(CreateCareReturn, [
  'date',
  'startTime',
  'endTime',
] as const) {
  @ApiProperty({
    example: 'c4b5617e-f8ce-4650-b50a-bb7e09b75ef2',
  })
  careId: string;

  @ApiProperty({
    example: 5,
  })
  allCounting: number;

  @ApiProperty({
    example: '홍길동',
  })
  sitterName: string;

  @ApiProperty({
    example: 'SCHEDULE',
  })
  status: string;
}

export class GetCareRequestedReturn extends PickType(GetCareReceivedReturn, [
  'careId',
  'allCounting',
  'date',
  'startTime',
  'endTime',
  'status',
] as const) {
  @ApiProperty({
    example: '231105',
  })
  birth: string;

  @ApiProperty({
    example: '강남구',
  })
  watedGu: string;
}
