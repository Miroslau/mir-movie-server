import { UserInterface } from '../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsString } from 'class-validator';

export class CreateActorDto implements UserInterface {
  @ApiProperty({ example: 'Ivan', description: 'string' })
  @IsString({ message: 'The first name of actor must be only string' })
  firstName: string;

  @ApiProperty({ example: 'Ivanov', description: 'string' })
  @IsString({ message: 'The second name of actor must be only string' })
  secondName: string;

  @ApiProperty({ example: '2022-01-01', description: 'Date' })
  @IsDate({ message: 'The birth of actor must be only date' })
  Birth: Date;

  @ApiProperty({ example: 'The USA', description: 'string' })
  @IsString({ message: 'The nationality of actor must be only string' })
  Nationality: string;
}
