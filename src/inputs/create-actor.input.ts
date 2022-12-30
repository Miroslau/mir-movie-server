import { Field, InputType } from '@nestjs/graphql';
import { UserInterface } from '../interfaces/user.interface';

@InputType()
export class CreateActorInput implements UserInterface {
  @Field()
  firstName: string;

  @Field()
  secondName: string;

  @Field()
  Birth: Date;

  @Field()
  Nationality: string;
}
