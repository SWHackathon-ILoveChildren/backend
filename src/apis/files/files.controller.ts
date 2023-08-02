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
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/fildUpload.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
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
    schema: {
      type: 'string',
      example:
        'https://storage.googleapis.com /karuru-storage/2023-08-02/609f754d-ec57-4ba7-91a3-4b53245f0f37/2.jpeg',
    },
  })
  @ApiResponse({
    status: 422,
    description: '업로드 실패',
  })
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File
  ): Promise<string> {
    return await this.filesService.uploadImages({ file });
  }
}
