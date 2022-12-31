import { ApiProperty } from '@nestjs/swagger';

export class AddMoviesDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'id array of Movie',
  })
  moviesId: number[];
}
