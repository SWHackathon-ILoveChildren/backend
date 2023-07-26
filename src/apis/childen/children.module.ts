import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildEntity } from 'typeorm';
import { ChildrenService } from './children.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChildEntity])],
  providers: [ChildrenService],
  controllers: [],
})
export class ChildModule {}
