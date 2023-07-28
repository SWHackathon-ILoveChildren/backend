import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Care } from './entities/care.entity';
import { CaresService } from './care.service';
import { CaresController } from './care.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Care]), UsersModule],
  providers: [CaresService],
  controllers: [CaresController],
})
export class CaresModule {}
