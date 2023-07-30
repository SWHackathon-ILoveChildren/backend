import { PickType } from '@nestjs/swagger';
import { User } from 'src/apis/users/entities/user.entity';

export class LoginDto extends PickType(User, [
  'phoneNum',
  'password',
] as const) {}
