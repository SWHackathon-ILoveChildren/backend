import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WantedGu } from './entities/wantedGu.entity';
import { WantedGuService } from './watnedGu.service';

@Module({
  imports: [TypeOrmModule.forFeature([WantedGu])],
  providers: [WantedGuService],
  exports: [WantedGuService],
})
export class WantedGuModule {}
