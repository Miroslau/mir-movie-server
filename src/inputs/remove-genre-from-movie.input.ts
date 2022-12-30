import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class RemoveGenreFromMovieInput {
  @Field(() => ID)
  movieId: number;

  @Field(() => ID)
  genreId: number;
}
