import { Query, Resolver } from '@nestjs/graphql';
import { GenreService } from '../services/genre.service';
import { GenreEntity } from '../entities/genre.entity';

@Resolver('Genre')
export class GenreResolver {
  constructor(private readonly genreService: GenreService) {}

  @Query(() => [GenreEntity])
  async getAllGenres(): Promise<GenreEntity[]> {
    return await this.genreService.getAllGenres();
  }
}
