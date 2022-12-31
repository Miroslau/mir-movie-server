import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({ example: 'Fantasy', description: 'string' })
  @IsString({ message: 'The name of genre must be only string' })
  readonly genreName: string;
}
