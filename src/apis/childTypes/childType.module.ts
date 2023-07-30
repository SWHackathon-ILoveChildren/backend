import { Module } from '@nestjs/common';
import { ChildTypeService } from './childType.service';
import { ChildTypeController } from './childType.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildType } from './entities/childType.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChildType])],
  providers: [ChildTypeService],
  controllers: [ChildTypeController],
})
export class ChildTypeModule {}
