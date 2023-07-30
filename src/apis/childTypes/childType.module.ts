import { Module } from '@nestjs/common';
import { ChildTypeService } from './childType.service';
import { ChildTypeController } from './childType.controller';

@Module({
  imports: [],
  providers: [ChildTypeService],
  controllers: [ChildTypeController],
})
export class ChildTypeModule {}
