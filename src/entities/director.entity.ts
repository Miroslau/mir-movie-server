import { UserInterface } from '../interfaces/user.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'directors' })
export class DirectorEntity implements UserInterface {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Field()
  @Column({ name: 'FIRST_NAME' })
  firstName: string;

  @Field()
  @Column({ name: 'SECOND_NAME' })
  secondName: string;

  @Field()
  @Column({ name: 'BIRTH' })
  Birth: Date;

  @Field()
  @Column({ name: 'NATIONALITY' })
  Nationality: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @CreateDateColumn()
  UpdateAt: Date;
}
