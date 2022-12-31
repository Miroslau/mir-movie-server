import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  UseFilters,
} from '@nestjs/common';
import { DirectorService } from '../services/director.service';
import { DirectorEntity } from '../entities/director.entity';
import { CreateDirectorDto } from '../dto/create-director.dto';
import { AddMoviesDto } from '../dto/add-movies.dto';
import { DeleteMovieDto } from '../dto/delete-movie.dto';
import { UpdateDirectorDto } from '../dto/update-director.dto';
import { AllExceptionsFilter } from '../filters/http-exception.filter';

@ApiTags('Director')
@Controller('/directors')
export class DirectorsController {
  constructor(private readonly _directorService: DirectorService) {}

  @ApiOperation({ summary: 'Get all directors' })
  @ApiResponse({ type: [CreateDirectorDto] })
  @Get()
  @UseFilters(AllExceptionsFilter)
  async getAllDirectors(
    @Query('count') count: number,
    @Query('offset') offset: number,
  ): Promise<DirectorEntity[]> {
    return await this._directorService.getAllDirectors(count, offset);
  }

  @ApiOperation({ summary: 'Get director by Id' })
  @ApiResponse({ type: DirectorEntity })
  @Get(':id')
  @UseFilters(AllExceptionsFilter)
  async getDirectorById(@Param('id') id: number): Promise<DirectorEntity> {
    return await this._directorService.getDirectorById(id);
  }

  @ApiOperation({ summary: 'Create director' })
  @ApiBody({ type: CreateDirectorDto })
  @ApiResponse({ status: 200, type: CreateDirectorDto })
  @Post()
  @HttpCode(200)
  @UseFilters(AllExceptionsFilter)
  async createDirector(
    @Body() dto: CreateDirectorDto,
  ): Promise<DirectorEntity> {
    return await this._directorService.createDirector(dto);
  }

  @ApiOperation({ summary: 'Add movies for an director' })
  @ApiResponse({ status: 200, type: DirectorEntity })
  @ApiBody({ type: AddMoviesDto })
  @Post('/addMovies/:directorId')
  @HttpCode(200)
  @UseFilters(AllExceptionsFilter)
  async addMovieForDirector(
    @Param('directorId') directorId: number,
    @Body() dto: AddMoviesDto,
  ): Promise<DirectorEntity> {
    return await this._directorService.addMovieForDirector(directorId, dto);
  }

  @ApiOperation({ summary: 'Delete movie from the director' })
  @ApiResponse({ status: 200, type: DirectorEntity })
  @ApiBody({ type: DeleteMovieDto })
  @Post('/deleteMovie/:directorId')
  @HttpCode(200)
  @UseFilters(AllExceptionsFilter)
  async removeMovieFromDirector(
    @Param('directorId') directorId: number,
    @Body() dto: DeleteMovieDto,
  ): Promise<DirectorEntity> {
    return await this._directorService.removeMovieFromDirector(directorId, dto);
  }

  @ApiOperation({ summary: 'Delete director' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  @UseFilters(AllExceptionsFilter)
  async removeDirector(@Param('id') id: number): Promise<number> {
    return await this._directorService.removeDirector(id);
  }

  @ApiOperation({ summary: 'Update director' })
  @ApiBody({ type: UpdateDirectorDto })
  @ApiResponse({ status: 200, type: DirectorEntity })
  @Put(':id')
  @UseFilters(AllExceptionsFilter)
  async updateDirector(
    @Param('id') id: number,
    @Body() dto: UpdateDirectorDto,
  ): Promise<DirectorEntity> {
    return await this._directorService.updateDirector(id, dto);
  }
}
