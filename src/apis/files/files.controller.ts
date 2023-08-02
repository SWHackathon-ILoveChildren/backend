import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesService } from './files.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/fildUpload.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '시니어시터 수료증 이미지 업로드 API',
    description:
      'field key는 "file", 갯수 제한 1개, 업로드된 이미지는 GCP BUCKET 내 존재',
  })
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiResponse({
    status: 201,
    description: '업로드 성공',
    // type:
  })
  @ApiResponse({
    status: 422,
    description: '업로드 실패',
  })
  @UseInterceptors(FilesInterceptor('file', 1))
  async uploadFiles(
    @UploadedFile()
    file: Express.Multer.File
  ) {
    return await this.filesService.uploadImages({ file });
  }
}
