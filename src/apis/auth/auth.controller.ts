import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { IOAuthUser } from './interfaces/auth.interface';

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
    // type: ,
  })
  @ApiResponse({
    status: 403,
    description: '로그인 실패',
  })
  login(
    @Body() loginDto: LoginDto,
    @Req() req: Request & IOAuthUser,
    @Res() res: Response
  ) {
    return this.authservice.loginOAuth({ loginDto, req, res });
  }
}
