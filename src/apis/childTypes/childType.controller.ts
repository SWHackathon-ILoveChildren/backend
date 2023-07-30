import { Body, Controller, Post } from '@nestjs/common';
import { ChildTypeService } from './childType.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChildType } from './entities/childType.entity';
import { CreateChildTypeDto } from './dto/createChildType.dto';

@Controller('childType')
export class ChildTypeController {
  constructor(private childTypeService: ChildTypeService) {}

  @Post()
  @ApiOperation({
    summary: '아이 타입 생성 API (데이터베이스 생성용)',
  })
  @ApiResponse({
    status: 201,
    description: '생성 성공',
    type: ChildType,
  })
  @ApiResponse({
    status: 409,
    description: '생성 실패',
  })
  createChildType(@Body() createChildTypeDto: CreateChildTypeDto) {
    return this.childTypeService.create({ createChildTypeDto });
  }
}
