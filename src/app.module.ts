import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './apis/users/users.module';
import { ChildrenModule } from './apis/children/children.module';
import { GuModule } from './apis/gu/gu.module';
import { WantedGuModule } from './apis/wantedGu/watnedGu.module';
import { CareTypesModule } from './apis/careType/careTypes.module';
import { CaresModule } from './apis/cares/care.module';
import { AuthModule } from './apis/auth/auth.module';
import { ChildTypeModule } from './apis/childTypes/childType.module';
import { UserChildTypesModule } from './apis/userChildType/userChileTypes.module';
import { FilesModule } from './apis/files/files.module';
import { ImagesModule } from './apis/images/images.module';

@Module({
  imports: [
    AuthModule,
    CaresModule,
    CareTypesModule,
    ChildrenModule,
    ChildTypeModule,
    FilesModule,
    GuModule,
    ImagesModule,
    UsersModule,
    UserChildTypesModule,
    WantedGuModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
