import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from '../entities/actor.entity';
import { ActorService } from '../services/actor.service';
import { ActorResolver } from '../resolvers/actor.resolver';
import { MovieEntity } from '../entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity, MovieEntity])],
  providers: [ActorService, ActorResolver],
  exports: [TypeOrmModule],
})
export class ActorModule {}
