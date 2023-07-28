import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class CaresService {
  constructor(private usersService: UsersService) {}

  async create({ userId, ...createCaresDto }) {
    const user = await this.usersService.findOneById({ userId });
    console.log(user);
  }
}
