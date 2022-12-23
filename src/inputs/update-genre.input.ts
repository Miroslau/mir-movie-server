import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateGenreInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  genreName: string;
}
