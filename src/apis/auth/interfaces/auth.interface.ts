import { Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { ApiProperty } from '@nestjs/swagger';

export interface IOAuthUser {
  user: {
    phoneNum: string;
    password: string;
  };
}

export interface IAuthServiceSetRefreshToken {
  user?: User;
  res: Response;
}

export interface IAuthUser {
  user?: {
    id: string;
  };
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceLogin {
  loginDto: LoginDto;
  res: Response;
}

export class LoginReturn {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODI1ZDdjNi1mMWU2LTRlMWMtYTVhNy1iNTE1MmZkNzAxODIiLCJpYXQiOjE2OTA3MDY5NjcsImV4cCI6MTY5MDcxNDE2N30.IcyAzQKys30EQw7bD4ttKhf7X5KFFkZM2Ugi1PBmeOQ',
  })
  accessToken: string;
}
