import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieInput } from '../inputs/create-movie.input';
import { AddGenreForMovieInput } from '../inputs/add-genre-for-movie.input';
import { GenreEntity } from '../entities/genre.entity';
import { SearchMoviesByGenreInput } from '../inputs/search-movies-by-genre.input';
import { UpdateMovieInput } from '../inputs/update-moive.input';
import { RemoveGenreFromMovieInput } from '../inputs/remove-genre-from-movie.input';

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

  async searchMoviesByGenre(
    searchMoviesByGenreInput: SearchMoviesByGenreInput,
  ): Promise<MovieEntity[]> {
    return await this.movieRepository.findBy({
      genres: {
        genreName: searchMoviesByGenreInput.genreName,
      },
    });
  }

  async createMovie(createMovieInput: CreateMovieInput): Promise<MovieEntity> {
    return await this.movieRepository.save({ ...createMovieInput });
  }

  async addGenreForMovie(
    addGenreForMovieInput: AddGenreForMovieInput,
  ): Promise<MovieEntity> {
    const genres: GenreEntity[] = [];

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

  async updateMovie(updateMovieInput: UpdateMovieInput): Promise<MovieEntity> {
    await this.movieRepository.update(
      { id: updateMovieInput.id },
      { ...updateMovieInput },
    );

    return await this.getMovieById(updateMovieInput.id);
  }

  async removeMovie(id: number): Promise<number> {
    await this.movieRepository.delete({ id });
    return id;
  }

  async removeGenreFromMovie(
    removeGenreFromMovieInput: RemoveGenreFromMovieInput,
  ): Promise<MovieEntity> {
    const movie = await this.getMovieById(removeGenreFromMovieInput.movieId);

    movie.genres = movie.genres.filter((genre) => {
      return genre.id !== Number(removeGenreFromMovieInput.genreId);
    });

    await this.movieRepository.save(movie);

    return movie;
  }
}
