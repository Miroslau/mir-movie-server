import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MovieService } from '../services/movie.service';
import { MovieEntity } from '../entities/movie.entity';
import { CreateMovieInput } from '../inputs/create-movie.input';
import { AddGenreForMovieInput } from '../inputs/add-genre-for-movie.input';
import { SearchMoviesByGenreInput } from '../inputs/search-movies-by-genre.input';
import { UpdateMovieInput } from '../inputs/update-moive.input';
import { RemoveGenreFromMovieInput } from '../inputs/remove-genre-from-movie.input';

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

  @Query(() => [MovieEntity])
  async searchMoviesByGenre(
    @Args('searchMoviesByGenre')
    searchMoviesByGenreInput: SearchMoviesByGenreInput,
  ): Promise<MovieEntity[]> {
    return await this.movieService.searchMoviesByGenre(
      searchMoviesByGenreInput,
    );
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

  @Mutation(() => MovieEntity)
  async updateMovie(
    @Args('updateMovie') updateMovieInput: UpdateMovieInput,
  ): Promise<MovieEntity> {
    return await this.movieService.updateMovie(updateMovieInput);
  }

  @Mutation(() => Number)
  async removeMovie(@Args('id') id: number): Promise<number> {
    return await this.movieService.removeMovie(id);
  }

  @Mutation(() => MovieEntity)
  async removeGenreFromMovie(
    @Args('removeGenreFromMovie')
    removeGenreFromMovieInput: RemoveGenreFromMovieInput,
  ): Promise<MovieEntity> {
    return await this.movieService.removeGenreFromMovie(
      removeGenreFromMovieInput,
    );
  }
}
