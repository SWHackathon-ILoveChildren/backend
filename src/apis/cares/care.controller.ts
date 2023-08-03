import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CaresService } from './care.service';
import {
  CreateCaresByParentsUserDto,
  CreateCaresBySitterUserDto,
} from './dto/createCares.dto';
import { CreateCareReturn } from './interfaces/cares.interface';

@Controller('cares')
export class CaresController {
  constructor(private careservice: CaresService) {}

  @Get('/parents/careReceived/:parentsUserId')
  @ApiOperation({
    summary: '돌봄 받은 내역 목록 조회',
    description: 'returnCount에 3 입력하면, 최신순으로 3개 조회',
  })
  @ApiQuery({ name: 'returnCount', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    // type:
  })
  @ApiResponse({
    status: 422,
    description: '조회 실패',
  })
  getCareReceived(
    @Param('parentsUserId') parentsUserId: string,
    @Query('returnCount') returnCount: number
  ) {
    return this.careservice.getCareReceived({ parentsUserId, returnCount });
  }

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
  cancelCare(@Param('careId', ParseUUIDPipe) careId: string): Promise<string> {
    return this.careservice.updateToCancel({ careId });
  }

  @ApiOperation({
    summary: '돌봄 진행 못함 API',
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
  @Put('problem/:careId')
  problemCare(@Param('careId', ParseUUIDPipe) careId: string): Promise<string> {
    return this.careservice.updateToProblem({ careId });
  }
}
