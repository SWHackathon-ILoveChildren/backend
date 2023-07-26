import { Module } from '@nestjs/common';
import { CareType } from './entities/careType.entity';
import { CaresService } from './careTypes.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CareType])],
  providers: [CaresService],
  exports: [CaresService],
})
export class CareTypeModule {}
