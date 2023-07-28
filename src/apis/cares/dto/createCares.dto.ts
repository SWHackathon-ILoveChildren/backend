import { ApiProperty, PickType } from '@nestjs/swagger';
import { Care } from '../entities/care.entity';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCaresDto extends PickType(Care, [
  'date',
  'startTime',
  'endTime',
] as const) {
  @ApiProperty({
    example: '0dc011aa-d76e-11ed-afa1-0242ac120002',
    required: true,
  })
  @IsUUID()
  @IsNotEmpty()
  childrenId: string;
}
