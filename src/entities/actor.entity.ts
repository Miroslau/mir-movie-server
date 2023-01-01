import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserInterface } from '../interfaces/user.interface';
import { MovieEntity } from './movie.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'actors' })
export class ActorEntity implements UserInterface {
  @ApiProperty({ example: 1, description: 'number', required: true })
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @ApiProperty({
    example: 'David',
    description: 'string',
    required: true,
  })
  @Column({ name: 'FIRST_NAME' })
  firstName: string;

  @ApiProperty({
    example: 'Yates',
    description: 'string',
    required: true,
  })
  @Column({ name: 'SECOND_NAME' })
  secondName: string;

  @ApiProperty({
    example: 'http://......',
    description: 'string',
    required: true,
  })
  @Column({ name: 'IMAGE', nullable: true })
  image: string;

  @ApiProperty({ example: '2022-12-01', description: 'Date', required: true })
  @Column({ name: 'BIRTH' })
  Birth: Date;

  @ApiProperty({
    example: 'The USA',
    description: 'string',
    required: true,
  })
  @Column({ name: 'NATIONALITY' })
  Nationality: string;

  @ApiProperty({
    example: [MovieEntity],
    description: 'MovieEntity[]',
    nullable: true,
  })
  @ManyToMany(() => MovieEntity, (movie) => movie.actors, {
    cascade: true,
  })
  @JoinTable()
  movies: MovieEntity[];

  @ApiProperty({ example: '2022-12-01', description: 'Date' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2022-12-01', description: 'Date' })
  @UpdateDateColumn()
  UpdateAt: Date;
}
