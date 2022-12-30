import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveMovieFromDirectorInput {
  @Field(() => ID)
  directorId: number;

  @Field(() => ID)
  movieId: number;
}
