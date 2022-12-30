import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateMovieInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  release: Date;

  @Field({ nullable: true })
  rating: number;

  @Field({ nullable: true })
  plot: string;

  @Field({ nullable: true })
  movieLength: number;
}
