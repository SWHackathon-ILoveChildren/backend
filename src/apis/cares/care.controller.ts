import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CaresService } from './care.service';
import {
  CreateCaresByParentsUserDto,
  CreateCaresBySitterUserDto,
} from './dto/createCares.dto';
import { CreateCareReturn } from './interfaces/cares.interface';

@Controller('cares')
export class CaresController {
  constructor(private careservice: CaresService) {}

  @Post('/parents/:parentsUserId')
  @ApiOperation({
    summary: '부모 유저가 신청하는 돌봄 신청 API',
    description: '시니어시터 유저 소개페이지의 신청 API입니다.',
  })
  @ApiResponse({
    status: 201,
    description: '신청 성공',
    type: CreateCareReturn,
  })
  @ApiResponse({
    status: 422,
    description: '생성 실패',
  })
  createCareByParentsUser(
    @Param('parentsUserId', ParseUUIDPipe) parentsUserId: string, //
    @Body() createCaresDto: CreateCaresByParentsUserDto
  ): Promise<CreateCareReturn> {
    return this.careservice.createByParentsUser({
      parentsUserId,
      ...createCaresDto,
    });
  }

  @Post('/sitters/:sitterUserId')
  @ApiOperation({
    summary: '시니어시터 유저가 신청하는 돌봄 신청 API',
    description: '부모 유저 소개페이지의 신청 API입니다.',
  })
  @ApiResponse({
    status: 201,
    description: '신청 성공',
    type: CreateCareReturn,
  })
  @ApiResponse({
    status: 422,
    description: '생성 실패',
  })
  createCareBySitterUser(
    @Param('sitterUserId', ParseUUIDPipe) sitterUserId: string,
    @Body() createCaresDto: CreateCaresBySitterUserDto
  ): Promise<CreateCareReturn> {
    return this.careservice.createBySitterUser({
      sitterUserId,
      createCaresDto,
    });
  }

  @ApiOperation({
    summary: '돌봄 완료 API',
  })
  @ApiResponse({
    status: 200,
    description: '업데이트 성공',
    type: String,
  })
  @ApiResponse({
    status: 422,
    description: '업데이트 실패',
  })
  @Put('complete/:careId')
  completeCare(@Param('careId', ParseUUIDPipe) careId: string) {
    return this.careservice.updateToCompleteCare({ careId });
  }

  @ApiOperation({
    summary: '돌봄 취소 API',
  })
  @ApiResponse({
    status: 200,
    description: '업데이트 성공',
    type: String,
  })
  @ApiResponse({
    status: 422,
    description: '업데이트 실패',
  })
  @Put('cancel/:careId')
  cancelCare(@Param('careId', ParseUUIDPipe) careId: string) {
    return this.careservice.updateToCancel({ careId });
  }
}
