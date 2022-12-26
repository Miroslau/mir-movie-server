import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectorEntity } from '../entities/director.entity';
import { Repository } from 'typeorm';
import { CreateDirectorInput } from '../inputs/create-director.input';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(DirectorEntity)
    private readonly directorRepository: Repository<DirectorEntity>,
  ) {}

  async getAllDirectors(): Promise<DirectorEntity[]> {
    return await this.directorRepository.find();
  }

  async getDirectorById(id: number): Promise<DirectorEntity> {
    return await this.directorRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async createDirector(
    createDirectorInput: CreateDirectorInput,
  ): Promise<DirectorEntity> {
    return await this.directorRepository.save({ ...createDirectorInput });
  }
}
