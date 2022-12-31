import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteGenreDto {
  @ApiProperty({ example: 1, description: 'number' })
  @IsNumber()
  genreId: number;
}
