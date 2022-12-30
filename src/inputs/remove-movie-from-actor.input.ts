import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveMovieFromActorInput {
  @Field(() => ID)
  actorId: number;

  @Field(() => ID)
  movieId: number;
}
