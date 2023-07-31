import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserChildType } from './entities/userChildType.entity';
import { UserChildTypesService } from './userChileTypes.service';
import { ChildTypeModule } from '../childTypes/childType.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserChildType]), ChildTypeModule],
  providers: [UserChildTypesService],
  exports: [UserChildTypesService],
})
export class UserChildTypesModule {}
