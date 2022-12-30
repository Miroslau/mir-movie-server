import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DirectorService } from '../services/director.service';
import { DirectorEntity } from '../entities/director.entity';
import { CreateDirectorInput } from '../inputs/create-director.input';
import { AddMovieForDirectorInput } from '../inputs/add-movie-for-director.input';
import { RemoveMovieFromDirectorInput } from '../inputs/remove-movie-from-director.input';
import { UpdateDirectorInput } from '../inputs/update-director-input';

@Resolver('Director')
export class DirectorResolver {
  constructor(private readonly directorService: DirectorService) {}

  @Query(() => [DirectorEntity])
  async getAllDirectors(): Promise<DirectorEntity[]> {
    return await this.directorService.getAllDirectors();
  }

  @Query(() => DirectorEntity)
  async getDirectorById(@Args('id') id: number): Promise<DirectorEntity> {
    return await this.directorService.getDirectorById(id);
  }

  @Mutation(() => DirectorEntity)
  async createDirector(
    @Args('createDirector') createDirectorInput: CreateDirectorInput,
  ): Promise<DirectorEntity> {
    return await this.directorService.createDirector(createDirectorInput);
  }

  @Mutation(() => DirectorEntity)
  async addMovieForDirector(
    @Args('addMovieForDirector')
    addMovieForDirectorInput: AddMovieForDirectorInput,
  ): Promise<DirectorEntity> {
    return await this.directorService.addMovieForDirector(
      addMovieForDirectorInput,
    );
  }

  @Mutation(() => Number)
  async removeDirector(@Args('id') id: number): Promise<number> {
    return await this.directorService.removeDirector(id);
  }

  @Mutation(() => DirectorEntity)
  async removeMovieFromDirector(
    @Args('removeMovieFromDirector')
    removeMovieFromDirectorInput: RemoveMovieFromDirectorInput,
  ): Promise<DirectorEntity> {
    return await this.directorService.removeMovieFromDirector(
      removeMovieFromDirectorInput,
    );
  }

  @Mutation(() => DirectorEntity)
  async updateDirector(
    @Args('updateDirector') updateDirectorInput: UpdateDirectorInput,
  ): Promise<DirectorEntity> {
    return await this.directorService.updateDirector(updateDirectorInput);
  }
}
