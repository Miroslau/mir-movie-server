import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ActorService } from '../services/actor.service';
import { ActorEntity } from '../entities/actor.entity';
import { CreateActorInput } from '../inputs/create-actor.input';

@Resolver('Actor')
export class ActorResolver {
  constructor(private readonly actorService: ActorService) {}

  @Query(() => [ActorEntity])
  async getAllActors(): Promise<ActorEntity[]> {
    return await this.actorService.getAllActors();
  }

  @Mutation(() => ActorEntity)
  async createActor(
    @Args('createActor') createActorInput: CreateActorInput,
  ): Promise<ActorEntity> {
    return await this.actorService.createActor(createActorInput);
  }
}
