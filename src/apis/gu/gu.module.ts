import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gu } from './entities/gu.entity';
import { GuService } from './gu.service';
import { GuController } from './gu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Gu])],
  providers: [GuService],
  controllers: [GuController],
  exports: [GuService],
})
export class GuModule {}
