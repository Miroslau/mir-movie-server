import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SearchMoviesByGenreInput {
  @Field({ nullable: true })
  genreName: string;
}
