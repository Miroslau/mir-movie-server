import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteMovieDto {
  @ApiProperty({ example: 1, description: 'number' })
  @IsNumber()
  movieId: number;
}
