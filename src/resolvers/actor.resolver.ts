import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ActorService } from '../services/actor.service';
import { ActorEntity } from '../entities/actor.entity';
import { CreateActorInput } from '../inputs/create-actor.input';
import { AddMovieForActorInput } from '../inputs/add-movie-for-actor.input';
import { UpdateActorInput } from '../inputs/update-actor.input';
import { RemoveMovieFromActorInput } from '../inputs/remove-movie-from-actor.input';

@Resolver('Actor')
export class ActorResolver {
  constructor(private readonly actorService: ActorService) {}

  @Query(() => [ActorEntity])
  async getAllActors(): Promise<ActorEntity[]> {
    return await this.actorService.getAllActors();
  }

  @Query(() => ActorEntity)
  async getActorById(@Args('id') id: number): Promise<ActorEntity> {
    return await this.actorService.getActorById(id);
  }

  @Mutation(() => ActorEntity)
  async createActor(
    @Args('createActor') createActorInput: CreateActorInput,
  ): Promise<ActorEntity> {
    return await this.actorService.createActor(createActorInput);
  }

  @Mutation(() => ActorEntity)
  async addMovieForActor(
    @Args('addMovieForActor') addMovieForActorInput: AddMovieForActorInput,
  ): Promise<ActorEntity> {
    return await this.actorService.addMovieForActor(addMovieForActorInput);
  }

  @Mutation(() => Number)
  async removeActor(@Args('id') id: number): Promise<number> {
    return await this.actorService.removeActor(id);
  }

  @Mutation(() => ActorEntity)
  async removeMovieFromActor(
    @Args('removeMovieFromActor')
    removeMovieFromActorInput: RemoveMovieFromActorInput,
  ): Promise<ActorEntity> {
    return await this.actorService.removeMovieFromActor(
      removeMovieFromActorInput,
    );
  }

  @Mutation(() => ActorEntity)
  async updateActor(
    @Args('updateActor') updateActorInput: UpdateActorInput,
  ): Promise<ActorEntity> {
    return await this.actorService.updateActor(updateActorInput);
  }
}
