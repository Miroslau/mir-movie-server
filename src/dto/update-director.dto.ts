import { UserInterface } from '../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class UpdateDirectorDto implements UserInterface {
  @ApiProperty({ example: 'Ivan', description: 'string', nullable: true })
  @IsString({ message: 'The first name of director must be only string' })
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'string', nullable: true })
  @IsString({ message: 'The second name of director must be only string' })
  secondName: string;

  @ApiProperty({ example: '2022-01-01', description: 'Date', nullable: true })
  @IsDate({ message: 'The birth of director must be only date' })
  Birth: Date;

  @ApiProperty({ example: 'The USA', description: 'string', nullable: true })
  @IsString({ message: 'The nationality of director must be only string' })
  Nationality: string;
}
