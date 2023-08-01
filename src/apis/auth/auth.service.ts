import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async loginOAuth({ loginDto, res }: IAuthServiceLogin): Promise<object> {
    const { phoneNum, password } = loginDto;

    const user = await this.usersService.findOneByPhoneNum({ phoneNum });

    if (!user)
      throw new UnprocessableEntityException(
        '존재하지 않는 회원 정보입니다. 회원가입을 진행해 주세요.'
      );

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException(
        '비밀번호가 틀렸습니다. 다시 시도해주세요.'
      );

    this.setRefreshToken({ user, res });
    const accessToken = this.getAccessToken({ user });

    return res.json({ accessToken });
  }

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' }
    );
    res.setHeader('Access-Control-Allow-Origin', process.env.ORIGIN);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; path=/; domain=.34.64.176.81:3001; SameSite=None; Secure; httpOnly`
    );
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '2h' }
    );
  }
}
