import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DirectorEntity } from './director.entity';
import { GenreEntity } from './genre.entity';
import { ActorEntity } from './actor.entity';

@ObjectType()
@Entity({ name: 'movies' })
export class MovieEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Field()
  @Column({ name: 'TITLE' })
  title: string;

  @Field()
  @Column({ name: 'RELEASE' })
  release: Date;

  @Field()
  @Column({ name: 'RATING' })
  rating: number;

  @Field()
  @Column({ name: 'PLOT' })
  plot: string;

  @Field()
  @Column({ name: 'MOVIE_LENGTH' })
  movieLength: number;

  @Field(() => [DirectorEntity], { nullable: true })
  @OneToMany(() => DirectorEntity, (director) => director.movie)
  directors: DirectorEntity[];

  @Field(() => [GenreEntity], { nullable: true })
  @ManyToMany(() => GenreEntity, (genre) => genre.movies)
  genres: GenreEntity[];

  @Field(() => [ActorEntity], { nullable: true })
  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  actors: ActorEntity[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  UpdateAt: Date;
}
