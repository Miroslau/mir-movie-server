import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateGenreDto {
  @ApiProperty({ example: 'Fantasy', description: 'string', nullable: true })
  @IsString({ message: 'The name of genre must be only string' })
  readonly genreName: string;
}
