import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { MovieService } from '../services/movie.service';
import { MovieResolver } from '../resolvers/movie.resolver';
import { GenreEntity } from '../entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, GenreEntity])],
  providers: [MovieService, MovieResolver],
  exports: [TypeOrmModule],
})
export class MovieModule {}
