import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
