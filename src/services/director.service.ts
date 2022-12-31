import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectorEntity } from '../entities/director.entity';
import { Repository } from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { CreateDirectorDto } from '../dto/create-director.dto';
import { AddMoviesDto } from '../dto/add-movies.dto';
import { DeleteMovieDto } from '../dto/delete-movie.dto';
import { UpdateDirectorDto } from '../dto/update-director.dto';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(DirectorEntity)
    private readonly directorRepository: Repository<DirectorEntity>,

    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async getAllDirectors(count = 10, offset = 0): Promise<DirectorEntity[]> {
    return await this.directorRepository.find({
      skip: Number(offset),
      take: Number(count),
    });
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

  async createDirector(dto: CreateDirectorDto): Promise<DirectorEntity> {
    return await this.directorRepository.save({ ...dto });
  }

  async addMovieForDirector(
    directorId: number,
    dto: AddMoviesDto,
  ): Promise<DirectorEntity> {
    const movies: MovieEntity[] = [];

    for (const movieId of dto.moviesId) {
      const movie = await this.movieRepository.findOne({
        where: {
          id: movieId,
        },
      });

      movies.push(movie);
    }

    const director = await this.getDirectorById(directorId);

    director.movies = movies;

    await this.directorRepository.save(director);

    return await this.getDirectorById(directorId);
  }

  async removeMovieFromDirector(
    directorId: number,
    dto: DeleteMovieDto,
  ): Promise<DirectorEntity> {
    const director = await this.getDirectorById(directorId);

    director.movies = director.movies.filter((movie) => {
      return movie.id !== dto.movieId;
    });

    await this.directorRepository.save(director);

    return director;
  }

  async removeDirector(id: number): Promise<number> {
    await this.directorRepository.delete({ id });
    return id;
  }

  async updateDirector(
    id: number,
    dto: UpdateDirectorDto,
  ): Promise<DirectorEntity> {
    await this.directorRepository.update(
      {
        id,
      },
      {
        ...dto,
      },
    );

    return await this.getDirectorById(id);
  }
}
