import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { IAuthServiceSetRefreshToken } from './interfaces/auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async loginOAuth({ loginDto, req, res }) {
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

    // 3. 회원가입 O -> 로그인

    // 4. 리다이렉트
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
      `refreshToken=${refreshToken};path=/; SameSite=None; Secure; httpOnly`
    );
  }
}
