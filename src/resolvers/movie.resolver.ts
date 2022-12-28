import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from '../services/movie.service';
import { MovieEntity } from '../entities/movie.entity';
import { CreateMovieInput } from '../inputs/create-movie.input';
import { AddGenreForMovieInput } from '../inputs/add-genre-for-movie.input';

@Resolver('Movies')
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Query(() => [MovieEntity])
  async getAllMovies(): Promise<MovieEntity[]> {
    return await this.movieService.getAllMovies();
  }

  @Query(() => MovieEntity)
  async getMovieById(@Args('id') id: number): Promise<MovieEntity> {
    return await this.movieService.getMovieById(id);
  }

  @Mutation(() => MovieEntity)
  async createMovie(
    @Args('createMovie') createMovieInput: CreateMovieInput,
  ): Promise<MovieEntity> {
    return await this.movieService.createMovie(createMovieInput);
  }

  @Mutation(() => MovieEntity)
  async addGenreForMovie(
    @Args('addGenreForMovie') addGenreForMovieInput: AddGenreForMovieInput,
  ): Promise<MovieEntity> {
    return await this.movieService.addGenreForMovie(addGenreForMovieInput);
  }
}
