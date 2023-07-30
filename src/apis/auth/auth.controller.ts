import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
import { LoginReturn } from './interfaces/auth.interface';

@Controller()
export class AuthController {
  constructor(private authservice: AuthService) {}
  @Post('login')
  @ApiOperation({
    summary: '로그인 API',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: LoginReturn,
  })
  @ApiResponse({
    status: 403,
    description: '로그인 실패',
  })
  async login(
    @Body() loginDto: LoginDto,
    @Res() res: Response
  ): Promise<object> {
    return await this.authservice.loginOAuth({ loginDto, res });
  }
}
