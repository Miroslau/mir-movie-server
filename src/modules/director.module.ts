import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorEntity } from '../entities/director.entity';
import { DirectorService } from '../services/director.service';
import { MovieEntity } from '../entities/movie.entity';
import { DirectorsController } from '../controllers/directors.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DirectorEntity, MovieEntity])],
  controllers: [DirectorsController],
  providers: [DirectorService],
  exports: [TypeOrmModule],
})
export class DirectorModule {}
