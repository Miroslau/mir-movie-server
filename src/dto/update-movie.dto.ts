import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateMovieDto {
  @ApiProperty({
    example: 'Harry Potter',
    description: 'string',
    nullable: true,
  })
  @IsString({ message: 'The title of movie must be only string' })
  title: string;

  @ApiProperty({ example: '2022-01-01', description: 'Date', nullable: true })
  @IsDate({ message: 'The release movie must be only date' })
  release: Date;

  @ApiProperty({ example: 1, description: 'number', nullable: true })
  @IsNumber()
  rating: number;

  @ApiProperty({
    example: 'This text is about',
    description: 'string',
    nullable: true,
  })
  @IsString({ message: 'The plot movie must be only string' })
  plot: string;

  @ApiProperty({ example: 1, description: 'number', nullable: true })
  @IsNumber()
  movieLength: number;
}
