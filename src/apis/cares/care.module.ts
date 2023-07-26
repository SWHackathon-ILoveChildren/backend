import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Care } from './entities/care.entity';
import { CaresService } from './care.service';
import { CaresController } from './care.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Care])],
  providers: [CaresService],
  controllers: [CaresController],
})
export class CaresModule {}
