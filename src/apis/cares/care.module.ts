import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Care } from './entities/care.entity';
import { CaresService } from './care.service';
import { CaresController } from './care.controller';
import { UsersModule } from '../users/users.module';
import { ChildrenModule } from '../children/children.module';
import { ProfilesModule } from '../profiles/profiles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Care]),
    UsersModule,
    ChildrenModule,
    ProfilesModule,
  ],
  providers: [CaresService],
  controllers: [CaresController],
})
export class CaresModule {}
