import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieEntity } from './movie.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'genres' })
export class GenreEntity {
  @ApiProperty({ example: 1, description: 'number', required: true })
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @ApiProperty({
    example: 'Fantasy',
    description: 'string',
    required: true,
    uniqueItems: true,
  })
  @Column({ name: 'GENRE_NAME', unique: true })
  genreName: string;

  @ApiProperty({
    example: [MovieEntity],
    description: 'MovieEntity[]',
    nullable: true,
  })
  @ManyToMany(() => MovieEntity, (movie) => movie.genres)
  movies: MovieEntity[];

  @ApiProperty({ example: '2022-12-01', description: 'Date' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2022-12-01', description: 'Date' })
  @UpdateDateColumn()
  UpdateAt: Date;
}
