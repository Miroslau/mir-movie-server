import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectorEntity } from '../entities/director.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(DirectorEntity)
    private readonly directorRepository: Repository<DirectorEntity>,
  ) {}

  async getAllDirectors(): Promise<DirectorEntity[]> {
    return await this.directorRepository.find();
  }
}
