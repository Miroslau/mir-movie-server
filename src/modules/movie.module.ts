import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from '../entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class MovieModule {}
