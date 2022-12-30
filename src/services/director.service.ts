import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectorEntity } from '../entities/director.entity';
import { Repository } from 'typeorm';
import { CreateDirectorInput } from '../inputs/create-director.input';
import { MovieEntity } from '../entities/movie.entity';
import { AddMovieForDirectorInput } from '../inputs/add-movie-for-director.input';
import { UpdateDirectorInput } from '../inputs/update-director-input';
import { RemoveMovieFromDirectorInput } from '../inputs/remove-movie-from-director.input';

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
    const movies: MovieEntity[] = [];

    for (const movieId of addMovieForDirectorInput.moviesId) {
      const movie = await this.movieRepository.findOne({
        where: {
          id: movieId,
        },
      });

      movies.push(movie);
    }

    const director = await this.getDirectorById(
      addMovieForDirectorInput.directorId,
    );

    director.movies = movies;

    await this.directorRepository.save(director);

    return await this.getDirectorById(addMovieForDirectorInput.directorId);
  }

  async removeMovieFromDirector(
    removeMovieFromDirector: RemoveMovieFromDirectorInput,
  ): Promise<DirectorEntity> {
    const director = await this.getDirectorById(
      removeMovieFromDirector.directorId,
    );

    director.movies = director.movies.filter((movie) => {
      return movie.id !== Number(removeMovieFromDirector.movieId);
    });

    await this.directorRepository.save(director);

    return director;
  }

  async removeDirector(id: number): Promise<number> {
    await this.directorRepository.delete({ id });

    return id;
  }

  async updateDirector(
    updateDirectorInput: UpdateDirectorInput,
  ): Promise<DirectorEntity> {
    await this.directorRepository.update(
      {
        id: updateDirectorInput.id,
      },
      {
        ...updateDirectorInput,
      },
    );

    return await this.getDirectorById(updateDirectorInput.id);
  }
}
