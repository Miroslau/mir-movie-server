import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from '../entities/actor.entity';
import { ActorService } from '../services/actor.service';
import { MovieEntity } from '../entities/movie.entity';
import { ActorsController } from '../controllers/actors.controller';
import { S3Module } from './s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity, MovieEntity]), S3Module],
  controllers: [ActorsController],
  providers: [ActorService],
  exports: [TypeOrmModule],
})
export class ActorModule {}
