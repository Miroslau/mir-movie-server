import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieInput } from '../inputs/create-movie.input';
import { AddGenreForMovieInput } from '../inputs/add-genre-for-movie.input';
import { GenreEntity } from '../entities/genre.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,

    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
  ) {}

  async getAllMovies(): Promise<MovieEntity[]> {
    return await this.movieRepository.find();
  }

  async getMovieById(id: number): Promise<MovieEntity> {
    return await this.movieRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        directors: true,
        actors: true,
        genres: true,
      },
    });
  }

  async createMovie(createMovieInput: CreateMovieInput): Promise<MovieEntity> {
    return await this.movieRepository.save({ ...createMovieInput });
  }

  async addGenreForMovie(
    addGenreForMovieInput: AddGenreForMovieInput,
  ): Promise<MovieEntity> {
    const genres = [];

    for (const genreId of addGenreForMovieInput.genresId) {
      const genre = await this.genreRepository.findOne({
        where: {
          id: genreId,
        },
      });

      genres.push(genre);
    }

    const movie = await this.getMovieById(addGenreForMovieInput.movieId);

    movie.genres = genres;

    await this.movieRepository.save(movie);

    return movie;
  }
}
