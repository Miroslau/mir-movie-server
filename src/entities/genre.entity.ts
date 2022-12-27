import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MovieEntity } from './movie.entity';

@ObjectType()
@Entity({ name: 'genres' })
export class GenreEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Field()
  @Column({ name: 'GENRE_NAME', unique: true })
  genreName: string;

  @Field(() => [MovieEntity], { nullable: true })
  @ManyToMany(() => MovieEntity, (movie) => movie.genres, {
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
