import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ActorService } from '../services/actor.service';
import { ActorEntity } from '../entities/actor.entity';
import { CreateActorDto } from '../dto/create-actor.dto';
import { AddMoviesDto } from '../dto/add-movies.dto';
import { DeleteMovieDto } from '../dto/delete-movie.dto';
import { UpdateActorDto } from '../dto/update-actor.dto';
import { AllExceptionsFilter } from '../filters/http-exception.filter';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Actor')
@Controller('/actors')
export class ActorsController {
  constructor(private readonly _actorService: ActorService) {}

  @ApiOperation({ summary: 'Get all actors' })
  @ApiResponse({ type: [CreateActorDto] })
  @Get()
  @UseFilters(AllExceptionsFilter)
  async getAllActors(
    @Query('count') count: number,
    @Query('offset') offset: number,
  ): Promise<ActorEntity[]> {
    return await this._actorService.getAllActors(count, offset);
  }

  @ApiOperation({ summary: 'Get actor by Id' })
  @ApiResponse({ type: ActorEntity })
  @Get(':id')
  @UseFilters(AllExceptionsFilter)
  async getActorById(@Param('id') id: number): Promise<ActorEntity> {
    return await this._actorService.getActorById(id);
  }

  @ApiOperation({ summary: 'Create actor' })
  @ApiBody({ type: CreateActorDto })
  @ApiResponse({ status: 200, type: CreateActorDto })
  @Post()
  @HttpCode(200)
  @UseFilters(AllExceptionsFilter)
  async createActor(@Body() dto: CreateActorDto): Promise<ActorEntity> {
    return await this._actorService.createActor(dto);
  }

  @ApiOperation({ summary: 'Add image to actor' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post(':id/upload-file')
  @HttpCode(200)
  async addImageToActor(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: number,
  ): Promise<ActorEntity> {
    return await this._actorService.addImageToActor(id, file);
  }

  @ApiOperation({ summary: 'Add movies for an actor' })
  @ApiBody({ type: AddMoviesDto })
  @ApiResponse({ status: 200, type: ActorEntity })
  @Post('/addMovies/:actorId')
  @HttpCode(200)
  @UseFilters(AllExceptionsFilter)
  async addMovieForActor(
    @Param('actorId') actorId: number,
    @Body() dto: AddMoviesDto,
  ): Promise<ActorEntity> {
    return await this._actorService.addMovieForActor(actorId, dto);
  }

  @ApiOperation({ summary: 'Delete movie from the actor' })
  @ApiBody({ type: DeleteMovieDto })
  @ApiResponse({ status: 200, type: ActorEntity })
  @Post('/deleteMovie/:actorId')
  @HttpCode(200)
  @UseFilters(AllExceptionsFilter)
  async removeMovieFromActor(
    @Param('actorId') actorId: number,
    @Body() dto: DeleteMovieDto,
  ): Promise<ActorEntity> {
    return await this._actorService.removeMovieFromActor(actorId, dto);
  }

  @ApiOperation({ summary: 'Delete actor' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  @UseFilters(AllExceptionsFilter)
  async removeActor(@Param('id') id: number): Promise<number> {
    return await this._actorService.removeActor(id);
  }

  @ApiOperation({ summary: 'Update actor' })
  @ApiBody({ type: UpdateActorDto })
  @ApiResponse({ status: 200, type: ActorEntity })
  @Put(':id')
  @UseFilters(AllExceptionsFilter)
  async updateActor(
    @Param('id') id: number,
    @Body() dto: UpdateActorDto,
  ): Promise<ActorEntity> {
    return await this._actorService.updateActor(id, dto);
  }
}
