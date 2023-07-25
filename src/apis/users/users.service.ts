import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findOneByPhoneNum({ phoneNum }) {
    const user = await this.usersRepository.findOne({
      where: { phoneNum },
    });

    if (!user) {
      throw new UnprocessableEntityException('유저가 존재하지 않습니다.');
    }

    return user;
  }

  async createParent(createUserDto) {
    const { phoneNum, password } = createUserDto;

    const userCheck = await this.findOneByPhoneNum({ phoneNum });
    if (userCheck) throw new ConflictException('이미 등록된 이메일입니다.');
  }
}
