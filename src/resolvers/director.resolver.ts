import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DirectorService } from '../services/director.service';
import { DirectorEntity } from '../entities/director.entity';
import { CreateDirectorInput } from '../inputs/create-director.input';

@Resolver('Director')
export class DirectorResolver {
  constructor(private readonly directorService: DirectorService) {}

  @Query(() => [DirectorEntity])
  async getAllDirectors(): Promise<DirectorEntity[]> {
    return await this.directorService.getAllDirectors();
  }

  @Mutation(() => DirectorEntity)
  async createDirector(
    @Args('createDirector') createDirectorInput: CreateDirectorInput,
  ): Promise<DirectorEntity> {
    return await this.directorService.createDirector(createDirectorInput);
  }
}
