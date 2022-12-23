import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GenreService } from '../services/genre.service';
import { GenreEntity } from '../entities/genre.entity';
import { CreateGenreInput } from '../inputs/create-genre.input';
import { UpdateGenreInput } from '../inputs/update-genre.input';

@Resolver('Genre')
export class GenreResolver {
  constructor(private readonly genreService: GenreService) {}

  @Query(() => [GenreEntity])
  async getAllGenres(): Promise<GenreEntity[]> {
    return await this.genreService.getAllGenres();
  }

  @Query(() => GenreEntity)
  async getGenreById(@Args('id') id: number): Promise<GenreEntity> {
    return await this.genreService.getGenreById(id);
  }

  @Mutation(() => GenreEntity)
  async createGenre(
    @Args('createGenre') createGenreInput: CreateGenreInput,
  ): Promise<GenreEntity> {
    return await this.genreService.createGenre(createGenreInput);
  }

  @Mutation(() => Number)
  async removeGenre(@Args('id') id: number): Promise<number> {
    return await this.genreService.removeGenre(id);
  }

  @Mutation(() => GenreEntity)
  async updateGenre(
    @Args('updateGenre') updateGenreInput: UpdateGenreInput,
  ): Promise<GenreEntity> {
    return await this.genreService.updateGenre(updateGenreInput);
  }
}
