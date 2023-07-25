import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createParent(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createParent(createUserDto);
  }
}
