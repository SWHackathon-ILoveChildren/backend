import { Module } from '@nestjs/common';
import { CareType } from './entities/careType.entity';
import { CareTypesService } from './careTypes.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CareType])],
  providers: [CareTypesService],
  exports: [CareTypesService],
})
export class CareTypesModule {}
