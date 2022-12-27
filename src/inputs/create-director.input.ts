import { UserInterface } from '../interfaces/user.interface';
import { Field, InputType } from '@nestjs/graphql';
import { MovieEntity } from '../entities/movie.entity';

@InputType()
export class CreateDirectorInput implements UserInterface {
  @Field()
  firstName: string;

  @Field()
  secondName: string;

  @Field()
  Birth: Date;

  @Field()
  Nationality: string;
}

@InputType()
export class addFilmToDirector extends CreateDirectorInput {
  constructor() {
    super();
  }

  @Field(() => [MovieEntity], { nullable: true })
  movies: MovieEntity[];
}
