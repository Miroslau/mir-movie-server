import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from '../entities/actor.entity';
import { ActorService } from '../services/actor.service';
import { MovieEntity } from '../entities/movie.entity';
import { ActorsController } from '../controllers/actors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity, MovieEntity])],
  controllers: [ActorsController],
  providers: [ActorService],
  exports: [TypeOrmModule],
})
export class ActorModule {}
