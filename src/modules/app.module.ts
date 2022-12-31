import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from '../config/postgres.config.service';
import { GenreModule } from './genre.module';
import { DirectorModule } from './director.module';
import { MovieModule } from './movie.module';
import { ActorModule } from './actor.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../filters/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      synchronize: false,
      ...Connection,
    }),
    GenreModule,
    DirectorModule,
    MovieModule,
    ActorModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
