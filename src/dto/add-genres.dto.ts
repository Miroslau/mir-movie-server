import { ApiProperty } from '@nestjs/swagger';

export class AddGenresDto {
  @ApiProperty({
    example: [1, 2, 3],
    description: 'id array of Genre',
  })
  genresId: number[];
}
