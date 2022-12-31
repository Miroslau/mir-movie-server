import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from '../entities/actor.entity';
import { Repository } from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { AddMoviesDto } from '../dto/add-movies.dto';
import { DeleteMovieDto } from '../dto/delete-movie.dto';
import { UpdateActorDto } from '../dto/update-actor.dto';
import { CreateActorDto } from '../dto/create-actor.dto';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,

    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async getAllActors(count = 10, offset = 0): Promise<ActorEntity[]> {
    return await this.actorRepository.find({
      skip: Number(offset),
      take: Number(count),
    });
  }

  async getActorById(id: number): Promise<ActorEntity> {
    return await this.actorRepository.findOne({
      where: {
        id: id,
      },
      relations: {
        movies: true,
      },
    });
  }

  async createActor(dto: CreateActorDto): Promise<ActorEntity> {
    return await this.actorRepository.save({ ...dto });
  }

  async addMovieForActor(
    actorId: number,
    dto: AddMoviesDto,
  ): Promise<ActorEntity> {
    const movies: MovieEntity[] = [];

    for (const movieId of dto.moviesId) {
      const movie = await this.movieRepository.findOne({
        where: {
          id: movieId,
        },
      });

      movies.push(movie);
    }

    const actor = await this.getActorById(actorId);

    actor.movies = movies;

    await this.actorRepository.save(actor);

    return actor;
  }

  async removeMovieFromActor(
    actorId: number,
    dto: DeleteMovieDto,
  ): Promise<ActorEntity> {
    const actor = await this.getActorById(actorId);

    actor.movies = actor.movies.filter((movie) => {
      return movie.id !== dto.movieId;
    });

    await this.actorRepository.save(actor);

    return actor;
  }

  async removeActor(id: number): Promise<number> {
    await this.actorRepository.delete({ id });
    return id;
  }

  async updateActor(id: number, dto: UpdateActorDto): Promise<ActorEntity> {
    await this.actorRepository.update(
      {
        id,
      },
      { ...dto },
    );

    return await this.getActorById(id);
  }
}
