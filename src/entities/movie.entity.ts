import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DirectorEntity } from './director.entity';
import { GenreEntity } from './genre.entity';
import { ActorEntity } from './actor.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'movies' })
export class MovieEntity {
  @ApiProperty({ example: 1, description: 'number', required: true })
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @ApiProperty({
    example: 'Harry Potter',
    description: 'string',
    required: true,
  })
  @Column({ name: 'TITLE' })
  title: string;

  @ApiProperty({
    example: 'http://......',
    description: 'string',
    required: true,
  })
  @Column({ name: 'POSTER', nullable: true })
  poster: string;

  @ApiProperty({ example: '2022-12-01', description: 'Date', required: true })
  @Column({ name: 'RELEASE' })
  release: Date;

  @ApiProperty({ example: 1, description: 'number', required: true })
  @Column({ name: 'RATING' })
  rating: number;

  @ApiProperty({
    example: 'The text is about',
    description: 'string',
    required: true,
  })
  @Column({ name: 'PLOT' })
  plot: string;

  @ApiProperty({ example: 1, description: 'number', required: true })
  @Column({ name: 'MOVIE_LENGTH' })
  movieLength: number;

  @ApiProperty({
    example: [DirectorEntity],
    description: 'DirectorEntity[]',
    nullable: true,
  })
  @ManyToMany(() => DirectorEntity, (director) => director.movies)
  directors: DirectorEntity[];

  @ApiProperty({
    example: [GenreEntity],
    description: 'GenreEntity[]',
    nullable: true,
  })
  @ManyToMany(() => GenreEntity, (genre) => genre.movies, {
    cascade: true,
  })
  @JoinTable()
  genres: GenreEntity[];

  @ApiProperty({
    example: [ActorEntity],
    description: 'ActorEntity[]',
    nullable: true,
  })
  @ManyToMany(() => ActorEntity, (actor) => actor.movies)
  actors: ActorEntity[];

  @ApiProperty({ example: '2022-12-01', description: 'Date' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2022-12-01', description: 'Date' })
  @UpdateDateColumn()
  UpdateAt: Date;
}
