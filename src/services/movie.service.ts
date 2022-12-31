import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { Repository } from 'typeorm';
import { GenreEntity } from '../entities/genre.entity';
import { AddGenresDto } from '../dto/add-genres.dto';
import { DeleteGenreDto } from '../dto/delete-genre.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { CreateMovieDto } from '../dto/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,

    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
  ) {}

  async getAllMovies(count = 10, offset = 0): Promise<MovieEntity[]> {
    return await this.movieRepository.find({
      skip: Number(offset),
      take: Number(count),
    });
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

  async searchMoviesByGenre(genre: string): Promise<MovieEntity[]> {
    return await this.movieRepository.findBy({
      genres: {
        genreName: genre,
      },
    });
  }

  async createMovie(dto: CreateMovieDto): Promise<MovieEntity> {
    return await this.movieRepository.save({ ...dto });
  }

  async addGenreForMovie(
    movieId: number,
    dto: AddGenresDto,
  ): Promise<MovieEntity> {
    const genres: GenreEntity[] = [];

    for (const genreId of dto.genresId) {
      const genre = await this.genreRepository.findOne({
        where: {
          id: genreId,
        },
      });

      genres.push(genre);
    }

    const movie = await this.getMovieById(movieId);

    movie.genres = genres;

    await this.movieRepository.save(movie);

    return movie;
  }

  async removeGenreFromMovie(
    movieId: number,
    dto: DeleteGenreDto,
  ): Promise<MovieEntity> {
    const movie = await this.getMovieById(movieId);

    movie.genres = movie.genres.filter((genre) => {
      return genre.id !== dto.genreId;
    });

    await this.movieRepository.save(movie);

    return movie;
  }

  async removeMovie(id: number): Promise<number> {
    await this.movieRepository.delete({ id });
    return id;
  }

  async updateMovie(id: number, dto: UpdateMovieDto): Promise<MovieEntity> {
    await this.movieRepository.update({ id }, { ...dto });
    return await this.getMovieById(id);
  }
}
