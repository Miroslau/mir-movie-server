import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AddMovieForActorInput {
  @Field(() => ID)
  actorId: number;

  @Field(() => [ID])
  moviesId: number[];
}
