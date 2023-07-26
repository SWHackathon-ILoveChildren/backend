import { Body, Controller, Param, Post } from '@nestjs/common';
import { GuService } from './gu.service';
import { Gu } from './entities/gu.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateGuDto } from './dto/createGu.dto';

@Controller('gu')
export class GuController {
  constructor(private guService: GuService) {}

  @Post()
  @ApiOperation({
    summary:
      '구 생성 API (데이터 생성용), 피그마의 돌봄 지역 순서대로 저장 필요',
  })
  @ApiResponse({
    status: 201,
    description: '생성 성공',
    type: Gu,
  })
  @ApiResponse({
    status: 409,
    description: '생성 실패',
  })
  createGu(@Body() createGuDto: CreateGuDto): Promise<Gu> {
    return this.guService.create(createGuDto);
  }
}
