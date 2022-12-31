import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreEntity } from '../entities/genre.entity';
import { Repository } from 'typeorm';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';

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
      relations: {
        movies: true,
      },
    });
  }

  async createGenre(dto: CreateGenreDto): Promise<GenreEntity> {
    try {
      return await this.genreRepository.save({ ...dto });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async removeGenre(id: number): Promise<number> {
    await this.genreRepository.delete({ id });
    return id;
  }

  async updateGenre(id: number, dto: UpdateGenreDto): Promise<GenreEntity> {
    await this.genreRepository.update({ id }, { ...dto });
    return await this.getGenreById(id);
  }
}
