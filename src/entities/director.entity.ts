import { UserInterface } from '../interfaces/user.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MovieEntity } from './movie.entity';

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

  @Field(() => [MovieEntity], { nullable: true })
  @ManyToMany(() => MovieEntity, (movie) => movie.directors, {
    cascade: true,
  })
  @JoinTable()
  movies: MovieEntity[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  UpdateAt: Date;
}
