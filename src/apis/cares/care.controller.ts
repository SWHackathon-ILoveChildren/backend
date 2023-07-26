import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Care } from './entities/care.entity';
import { CaresService } from './care.service';

@Controller('cares')
export class CaresController {
  constructor(private careservice: CaresService) {}
  @Post()
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
  applyCare() {
    return this.careservice.apply();
  }
}
