import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorEntity } from '../entities/director.entity';
import { DirectorService } from '../services/director.service';
import { DirectorResolver } from '../resolvers/director.resolver';
import { MovieEntity } from '../entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DirectorEntity, MovieEntity])],
  providers: [DirectorService, DirectorResolver],
  exports: [TypeOrmModule],
})
export class DirectorModule {}
