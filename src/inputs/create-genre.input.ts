import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGenreInput {
  @Field()
  genreName: string;
}
