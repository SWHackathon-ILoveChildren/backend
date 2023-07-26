import { Body, Controller, Post } from '@nestjs/common';
import { CreateParentsDto } from './dto/createParents.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateParentsUsers,
  CreateSitterUsers,
} from './interfaces/users.interface';
import { CreateSittersDto } from './dto/createSitters.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('parents')
  @ApiOperation({
    summary: '부모 유저 생성 API',
  })
  @ApiResponse({
    status: 201,
    description: '생성 성공',
    type: CreateParentsUsers,
  })
  @ApiResponse({
    status: 409,
    description: '생성 실패',
  })
  createParent(@Body() createUserDto: CreateParentsDto) {
    return this.usersService.createParent(createUserDto);
  }

  @Post('sitters')
  @ApiOperation({
    summary: '시니어시터 유저 생성 API',
  })
  @ApiResponse({
    status: 201,
    description: '생성 성공',
    type: CreateSitterUsers,
  })
  @ApiResponse({
    status: 409,
    description: '생성 실패',
  })
  createSitter(@Body() createSittersDto: CreateSittersDto) {
    return this.usersService.createSitter(createSittersDto);
  }
}
