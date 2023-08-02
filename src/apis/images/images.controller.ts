import { ImagesService } from './images.service';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SaveImagesDto } from './dto/saveImages.dto';
import { SaveImagesReturn } from './interfaces/images.interface';

@Controller('images')
export class ImagesController {
  constructor(private imagesService: ImagesService) {}

  @Post(':sitterUserId')
  @ApiOperation({
    summary: '업로드 된 이미지 저장 API',
    description: 'GCP Bucket에 업로드 된 이미지 URL을 DB에 저장하기 위한 API',
  })
  @ApiResponse({
    status: 201,
    description: '저장 성공',
    type: SaveImagesReturn,
  })
  @ApiResponse({
    status: 422,
    description: '저장 실패',
  })
  saveImages(
    @Param('sitterUserId') sitterUserId: string,
    @Body() saveImagesDto: SaveImagesDto
  ): Promise<SaveImagesReturn> {
    return this.imagesService.save({ sitterUserId, saveImagesDto });
  }
}
