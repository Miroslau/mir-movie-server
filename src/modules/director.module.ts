import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorEntity } from '../entities/director.entity';
import { DirectorService } from '../services/director.service';
import { DirectorResolver } from '../resolvers/director.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([DirectorEntity])],
  providers: [DirectorService, DirectorResolver],
  exports: [TypeOrmModule],
})
export class DirectorModule {}
