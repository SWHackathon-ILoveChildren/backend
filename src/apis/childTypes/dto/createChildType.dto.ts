import { PickType } from '@nestjs/swagger';
import { ChildType } from '../entities/childType.entity';

export class CreateChildTypeDto extends PickType(ChildType, [
  'name',
] as const) {}
