import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { ChildrenModule } from '../children/children.module';
import { GuModule } from '../gu/gu.module';
import { WantedGuModule } from '../wantedGu/watnedGu.module';
import { CareTypeModule } from '../careType/careTypes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ChildrenModule,
    GuModule,
    WantedGuModule,
    CareTypeModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}