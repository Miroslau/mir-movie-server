import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActorEntity } from '../entities/actor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActorEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class ActorModule {}
