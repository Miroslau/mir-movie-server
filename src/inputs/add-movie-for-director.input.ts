import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AddMovieForDirectorInput {
  @Field(() => ID)
  directorId: number;

  @Field(() => [ID])
  moviesId: number[];
}
