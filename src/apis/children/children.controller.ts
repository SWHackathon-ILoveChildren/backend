import { Controller, Get, Param } from '@nestjs/common';
import { ChildrenService } from './children.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FetchAllChildrenReturn } from './interfaces/children.interface';

@Controller('children')
export class ChildrenController {
  constructor(private childrenService: ChildrenService) {}

  @Get(':parentsUserId')
  @ApiOperation({
    summary: '내 아이 전체 조회 API',
    description: '생년월일 순으로 조회 됩니다.',
  })
  @ApiResponse({
    status: 200,
    description: '조회 성공',
    type: [FetchAllChildrenReturn],
  })
  fetchAllChildren(
    @Param('parentsUserId') parentsUserId: string
  ): Promise<FetchAllChildrenReturn[]> {
    return this.childrenService.findAllByParentsUserId({ parentsUserId });
  }
}
