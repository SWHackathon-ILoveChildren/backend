import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class CaresService {
  constructor(private usersService: UsersService) {}

  async create({ userId, ...createCaresDto }) {
    const { childrenId, ...rest } = createCaresDto;

    const user = await this.usersService.findOneById({ userId });

    // const children = await this.
  }
}
