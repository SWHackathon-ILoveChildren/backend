import { Body, Controller } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  createParent(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createParent(createUserDto);
  }
}
