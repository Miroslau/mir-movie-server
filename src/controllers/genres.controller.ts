import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GenreService } from '../services/genre.service';
import { GenreEntity } from '../entities/genre.entity';
import { CreateGenreDto } from '../dto/create-genre.dto';
import { UpdateGenreDto } from '../dto/update-genre.dto';
import { AllExceptionsFilter } from '../filters/http-exception.filter';

@ApiTags('Genre')
@Controller('/genres')
export class GenresController {
  constructor(private readonly _genreService: GenreService) {}

  @ApiOperation({ summary: 'Get all genres' })
  @ApiResponse({ type: [CreateGenreDto] })
  @Get()
  @UseFilters(AllExceptionsFilter)
  async getAllGenres(): Promise<GenreEntity[]> {
    return await this._genreService.getAllGenres();
  }

  @ApiOperation({ summary: 'Get genre by Id' })
  @ApiResponse({ type: GenreEntity })
  @Get(':id')
  @UseFilters(AllExceptionsFilter)
  async getGenreById(@Param('id') id: number): Promise<GenreEntity> {
    return await this._genreService.getGenreById(id);
  }

  @ApiOperation({ summary: 'Create genre' })
  @ApiBody({ type: CreateGenreDto })
  @ApiResponse({ status: 200, type: CreateGenreDto })
  @Post()
  @HttpCode(200)
  @UseFilters(AllExceptionsFilter)
  async createGenre(@Body() dto: CreateGenreDto): Promise<GenreEntity> {
    return await this._genreService.createGenre(dto);
  }

  @ApiOperation({ summary: 'Delete genre' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  @UseFilters(AllExceptionsFilter)
  async removeGenre(@Param('id') id: number): Promise<number> {
    return await this._genreService.removeGenre(id);
  }

  @ApiOperation({ summary: 'Update genre' })
  @ApiBody({ type: UpdateGenreDto })
  @ApiResponse({ status: 200, type: GenreEntity })
  @Put(':id')
  @UseFilters(AllExceptionsFilter)
  async updateGenre(@Param('id') id: number, @Body() dto: UpdateGenreDto) {
    return await this._genreService.updateGenre(id, dto);
  }
}
