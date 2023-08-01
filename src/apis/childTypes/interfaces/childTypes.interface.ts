import { PickType } from '@nestjs/swagger';
import { ChildType } from '../entities/childType.entity';

export class CreateChildTypeReturn extends PickType(ChildType, [
  'id',
  'name',
] as const) {}

export class FetchChildTypeReturn extends CreateChildTypeReturn {}
