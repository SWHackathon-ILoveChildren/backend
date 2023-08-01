import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChildTypeService } from './childType.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateChildTypeDto } from './dto/createChildType.dto';
import {
  CreateChildTypeReturn,
  FetchChildTypeReturn,
} from './interfaces/childTypes.interface';

@Controller('childType')
export class ChildTypeController {
  constructor(private childTypeService: ChildTypeService) {}

  @Get()
  @ApiOperation({
    summary: '아이 타입 조회 API',
  })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    type: [FetchChildTypeReturn],
  })
  fetchChildType(): Promise<FetchChildTypeReturn[]> {
    return this.childTypeService.findAllByName();
  }

  @Post()
  @ApiOperation({
    summary: '아이 타입 생성 API (데이터베이스 생성용)',
  })
  @ApiResponse({
    status: 201,
    description: '생성 성공',
    type: CreateChildTypeReturn,
  })
  @ApiResponse({
    status: 409,
    description: '생성 실패',
  })
  createChildType(
    @Body() createChildTypeDto: CreateChildTypeDto
  ): Promise<CreateChildTypeReturn> {
    return this.childTypeService.create(createChildTypeDto);
  }
}
