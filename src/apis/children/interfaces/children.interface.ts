import { PickType } from '@nestjs/swagger';
import { Children } from '../entities/children.entity';

export interface IChildrenAddChildren {
  childrenBirths: string[];
  userId: string;
}

export class FetchAllChildrenReturn extends PickType(Children, [
  'id',
  'birth',
] as const) {}
