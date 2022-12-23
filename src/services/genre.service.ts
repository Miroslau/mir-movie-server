import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreEntity } from '../entities/genre.entity';
import { Repository } from 'typeorm';
import { CreateGenreInput } from '../inputs/create-genre.input';
import { UpdateGenreInput } from '../inputs/update-genre.input';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
  ) {}

  async getAllGenres(): Promise<GenreEntity[]> {
    return await this.genreRepository.find();
  }

  async getGenreById(id: number): Promise<GenreEntity> {
    return await this.genreRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async createGenre(createGenreInput: CreateGenreInput): Promise<GenreEntity> {
    return await this.genreRepository.save({ ...createGenreInput });
  }

  async removeGenre(id: number): Promise<number> {
    await this.genreRepository.delete({ id });
    return id;
  }

  async updateGenre(updateGenreInput: UpdateGenreInput): Promise<GenreEntity> {
    await this.genreRepository.update(
      { id: updateGenreInput.id },
      { ...updateGenreInput },
    );
    return await this.getGenreById(updateGenreInput.id);
  }
}
