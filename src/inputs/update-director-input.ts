import { Field, ID, InputType } from '@nestjs/graphql';
import { UserInterface } from '../interfaces/user.interface';

@InputType()
export class UpdateDirectorInput implements UserInterface {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  secondName: string;

  @Field({ nullable: true })
  Birth: Date;

  @Field({ nullable: true })
  Nationality: string;
}
