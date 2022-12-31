import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreEntity } from '../entities/genre.entity';
import { GenreService } from '../services/genre.service';
import { GenresController } from '../controllers/genres.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity])],
  controllers: [GenresController],
  providers: [GenreService],
  exports: [TypeOrmModule],
})
export class GenreModule {}
