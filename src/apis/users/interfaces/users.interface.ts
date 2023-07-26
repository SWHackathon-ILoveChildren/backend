import { OmitType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class CreateParentsUsers extends OmitType(User, [
  'childType',
  'profile',
  'childrens',
  'careTypes',
  'wantedGues',
] as const) {}
