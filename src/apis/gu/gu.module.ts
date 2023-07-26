import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gu } from './entities/gu.entity';
import { GuService } from './gu.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gu])],
  providers: [GuService],
  exports: [GuService],
})
export class GuModule {}
