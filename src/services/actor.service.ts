import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorEntity } from '../entities/actor.entity';
import { Repository } from 'typeorm';
import { CreateActorInput } from '../inputs/create-actor.input';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
  ) {}

  async getAllActors(): Promise<ActorEntity[]> {
    return await this.actorRepository.find();
  }

  async getActorById(id: number): Promise<ActorEntity> {
    return await this.actorRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async createActor(createActorInput: CreateActorInput): Promise<ActorEntity> {
    return await this.actorRepository.save({ ...createActorInput });
  }
}
