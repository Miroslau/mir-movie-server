import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'Harry Potter', description: 'string' })
  @IsString({ message: 'The title of movie must be only string' })
  title: string;

  @ApiProperty({ example: '2022-01-01', description: 'Date' })
  @IsDate({ message: 'The release movie must be only date' })
  release: Date;

  @ApiProperty({ example: 1, description: 'number' })
  @IsNumber()
  rating: number;

  @ApiProperty({ example: 'This text is about', description: 'string' })
  @IsString({ message: 'The plot movie must be only string' })
  plot: string;

  @ApiProperty({ example: 1, description: 'number' })
  @IsNumber()
  movieLength: number;
}
