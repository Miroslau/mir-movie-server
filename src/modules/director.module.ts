import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorEntity } from '../entities/director.entity';
import { DirectorService } from '../services/director.service';
import { MovieEntity } from '../entities/movie.entity';
import { DirectorsController } from '../controllers/directors.controller';
import { S3Module } from './s3.module';

@Module({
  imports: [TypeOrmModule.forFeature([DirectorEntity, MovieEntity]), S3Module],
  controllers: [DirectorsController],
  providers: [DirectorService],
  exports: [TypeOrmModule],
})
export class DirectorModule {}
