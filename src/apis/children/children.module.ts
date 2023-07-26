import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildrenService } from './children.service';
import { Children } from './entities/children.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Children])],
  providers: [ChildrenService],
  controllers: [],
  exports: [ChildrenService],
})
export class ChildrenModule {}
