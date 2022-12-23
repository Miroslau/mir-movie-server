import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from '../entities/genre.entity';
import { GenreService } from '../services/genre.service';
import { GenreResolver } from '../resolvers/genre.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity])],
  providers: [GenreService, GenreResolver],
  exports: [TypeOrmModule],
})
export class GenreModule {}
