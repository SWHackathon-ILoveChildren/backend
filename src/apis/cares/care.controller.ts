import { Body, Controller, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Care } from './entities/care.entity';
import { CaresService } from './care.service';
import { CreateCaresDto } from './dto/createCares.dto';

@Controller('cares')
export class CaresController {
  constructor(private careservice: CaresService) {}

  @Post(':userId')
  @ApiOperation({
    summary: '돌봄 신청 API',
  })
  @ApiResponse({
    status: 201,
    description: '신청 성공',
    type: Care,
  })
  @ApiResponse({
    status: 422,
    description: '생성 실패',
  })
  createCare(
    @Param('userId', ParseUUIDPipe) userId: string, //
    @Body() createCaresDto: CreateCaresDto
  ) {
    return this.careservice.create({ userId, ...createCaresDto });
  }
}
