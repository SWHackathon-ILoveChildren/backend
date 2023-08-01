import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateParentsDto } from './dto/createParents.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateParentsUsers,
  CreateSitterUsers,
  FetchUserPhoneNumReturn,
  FetchUserReturn,
  fetchBestSitterUserReturn,
} from './interfaces/users.interface';
import { CreateSittersDto } from './dto/createSitters.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: '유저 PhoneNum 기반 해당 유저 조회 API',
  })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    type: FetchUserReturn,
  })
  @ApiResponse({
    status: 422,
    description: '조회 실패',
  })
  fetchUser(@Query('phoneNum') phoneNum: string): Promise<FetchUserReturn> {
    return this.usersService.findOneByPhoneNum({ phoneNum });
  }

  @Get(':userId')
  @ApiOperation({
    summary: '유저 Id 기반 휴대폰 번호 조회 API',
  })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    type: FetchUserPhoneNumReturn,
  })
  @ApiResponse({
    status: 422,
    description: '조회 실패',
  })
  fetchUserPhoneNum(
    @Param('userId') userId: string
  ): Promise<FetchUserPhoneNumReturn> {
    return this.usersService.findOneByUserId({ userId });
  }

  @Get('/sitters/:parentsUserId')
  @ApiOperation({
    summary: '지역 추천 시니어 시터 조회 API',
  })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    type: [fetchBestSitterUserReturn],
  })
  @ApiResponse({
    status: 422,
    description: '조회 실패',
  })
  fetchBestSitterUser(
    @Param('parentsUserId') parentsUserId: string
  ): Promise<fetchBestSitterUserReturn[]> {
    return this.usersService.bestSitterFindAllByParentsUserId({
      parentsUserId,
    });
  }

  @Get('/sitters')
  @ApiOperation({
    summary: '전체 시니어 시터 목록 조회 API',
  })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    // type:
  })
  @ApiResponse({
    status: 422,
    description: '조회 실패',
  })
  fetchSitterUsers() {
    return this.usersService.sitterFindAll();
  }

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
