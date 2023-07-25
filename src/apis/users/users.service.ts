import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  createParent(createUserDto) {
    const { phoneNum, password } = createUserDto;

    const userCheck = await this.findOneByPhoneNum();
  }
}
