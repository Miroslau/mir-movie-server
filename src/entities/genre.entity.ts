import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'genres' })
export class GenreEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn({ name: 'ID' })
  id: number;

  @Field()
  @Column({ name: 'GENRE_NAME', unique: true })
  genreName: string;
}
