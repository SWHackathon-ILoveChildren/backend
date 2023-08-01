import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildrenService } from './children.service';
import { Children } from './entities/children.entity';
import { ChildrenController } from './children.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Children])],
  providers: [ChildrenService],
  controllers: [ChildrenController],
  exports: [ChildrenService],
})
export class ChildrenModule {}
