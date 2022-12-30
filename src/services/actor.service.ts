import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from '../entities/actor.entity';
import { Repository } from 'typeorm';
import { CreateActorInput } from '../inputs/create-actor.input';
import { MovieEntity } from '../entities/movie.entity';
import { AddMovieForActorInput } from '../inputs/add-movie-for-actor.input';
import { UpdateActorInput } from '../inputs/update-actor.input';
import { RemoveMovieFromActorInput } from '../inputs/remove-movie-from-actor.input';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,

    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async getAllActors(): Promise<ActorEntity[]> {
    return await this.actorRepository.find();
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

  async createActor(createActorInput: CreateActorInput): Promise<ActorEntity> {
    return await this.actorRepository.save({ ...createActorInput });
  }

  async addMovieForActor(
    addMovieForActorInput: AddMovieForActorInput,
  ): Promise<ActorEntity> {
    const movies: MovieEntity[] = [];

    for (const movieId of addMovieForActorInput.moviesId) {
      const movie = await this.movieRepository.findOne({
        where: {
          id: movieId,
        },
      });

      movies.push(movie);
    }

    const actor = await this.getActorById(addMovieForActorInput.actorId);

    actor.movies = movies;

    await this.actorRepository.save(actor);

    return actor;
  }

  async removeMovieFromActor(
    removeMovieFromActorInput: RemoveMovieFromActorInput,
  ): Promise<ActorEntity> {
    const actor = await this.getActorById(removeMovieFromActorInput.actorId);

    actor.movies = actor.movies.filter((movie) => {
      return movie.id !== Number(removeMovieFromActorInput.movieId);
    });

    await this.actorRepository.save(actor);

    return actor;
  }

  async removeActor(id: number): Promise<number> {
    await this.actorRepository.delete({ id });

    return id;
  }

  async updateActor(updateActorInput: UpdateActorInput): Promise<ActorEntity> {
    await this.actorRepository.update(
      {
        id: updateActorInput.id,
      },
      { ...updateActorInput },
    );

    return await this.getActorById(updateActorInput.id);
  }
}
