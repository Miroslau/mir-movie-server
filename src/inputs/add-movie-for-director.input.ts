import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AddMovieForDirectorInput {
  @Field(() => ID)
  movieId: number;

  @Field(() => ID)
  directorId: number;
}
