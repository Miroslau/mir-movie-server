import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field()
  title: string;

  @Field()
  release: Date;

  @Field()
  rating: number;

  @Field()
  plot: string;

  @Field()
  movieLength: number;
}
