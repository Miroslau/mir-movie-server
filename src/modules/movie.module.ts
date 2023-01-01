import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { MovieService } from '../services/movie.service';
import { GenreEntity } from '../entities/genre.entity';
import { MoviesController } from '../controllers/movies.controller';
import { S3Module } from './s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, GenreEntity]), S3Module],
  controllers: [MoviesController],
  providers: [MovieService],
  exports: [TypeOrmModule],
})
export class MovieModule {}
