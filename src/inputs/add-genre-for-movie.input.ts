import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AddGenreForMovieInput {
  @Field(() => ID)
  movieId: number;

  @Field(() => [ID])
  genresId: number[];
}
