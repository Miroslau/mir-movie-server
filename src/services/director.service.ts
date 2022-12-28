import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectorEntity } from '../entities/director.entity';
import { Repository } from 'typeorm';
import { CreateDirectorInput } from '../inputs/create-director.input';
import { MovieEntity } from '../entities/movie.entity';
import { AddMovieForDirectorInput } from '../inputs/add-movie-for-director.input';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(DirectorEntity)
    private readonly directorRepository: Repository<DirectorEntity>,

    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async getAllDirectors(): Promise<DirectorEntity[]> {
    return await this.directorRepository.find();
  }

  async getDirectorById(id: number): Promise<DirectorEntity> {
    return await this.directorRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        movies: true,
      },
    });
  }

  async createDirector(
    createDirectorInput: CreateDirectorInput,
  ): Promise<DirectorEntity> {
    return await this.directorRepository.save({ ...createDirectorInput });
  }

  async addMovieForDirector(
    addMovieForDirectorInput: AddMovieForDirectorInput,
  ): Promise<DirectorEntity> {
    const movie = await this.movieRepository.findOne({
      where: {
        id: addMovieForDirectorInput.movieId,
      },
    });

    const director = await this.getDirectorById(
      addMovieForDirectorInput.directorId,
    );

    movie.directors = [director];

    await this.movieRepository.save(movie);

    return await this.getDirectorById(addMovieForDirectorInput.directorId);
  }
}
