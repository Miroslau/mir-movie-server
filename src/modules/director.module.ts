import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorEntity } from '../entities/director.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DirectorEntity])],
  providers: [],
  exports: [TypeOrmModule],
})
export class DirectorModule {}
