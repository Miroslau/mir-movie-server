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
  UploadedFiles,
  UseFilters,
  UseInterceptors,
  Request,
} from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { MovieEntity } from '../entities/movie.entity';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { AddGenresDto } from '../dto/add-genres.dto';
import { DeleteGenreDto } from '../dto/delete-genre.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { AllExceptionsFilter } from '../filters/http-exception.filter';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {Pagination} from "../paginate/pagination";

@ApiTags('Movie')
@Controller('/movies')
export class MoviesController {
  constructor(private readonly _movieService: MovieService) {}

  @ApiOperation({ summary: 'Get all movies' })
  @ApiResponse({ type: [CreateMovieDto] })
  @Get()
  @UseFilters(AllExceptionsFilter)
  async getAllMovies(@Request() request): Promise<Pagination<MovieEntity>> {
    return await this._movieService.getAllMovies({
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
      page: request.query.hasOwnProperty('page') ? request.query.page : 0,
    });
  }

  @ApiOperation({ summary: 'Search movies by genre name' })
  @ApiResponse({ type: [CreateMovieDto] })
  @Get('/search')
  @UseFilters(AllExceptionsFilter)
  async searchMoviesByGenre(
    @Query('genre') genre: string,
  ): Promise<MovieEntity[]> {
    return await this._movieService.searchMoviesByGenre(genre);
  }

  @ApiOperation({ summary: 'Get movie by Id' })
  @ApiResponse({ type: MovieEntity })
  @Get(':id')
  @UseFilters(AllExceptionsFilter)
  async getMovieById(@Param('id') id: number): Promise<MovieEntity> {
    return await this._movieService.getMovieById(id);
  }

  @ApiOperation({ summary: 'Create movie' })
  @ApiBody({ type: CreateMovieDto })
  @ApiResponse({ status: 200, type: CreateMovieDto })
  @Post()
  @HttpCode(200)
  @UseFilters(AllExceptionsFilter)
  async createMovie(@Body() dto: CreateMovieDto): Promise<MovieEntity> {
    return await this._movieService.createMovie(dto);
  }

  @ApiOperation({ summary: 'Add posters to movie' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        posterUrl: {
          type: 'string',
          format: 'binary',
        },
        horizontalPoster: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post(':id/upload-posters')
  @HttpCode(200)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'posterUrl', maxCount: 1 },
      { name: 'horizontalPoster', maxCount: 1 },
    ]),
  )
  async addPostersForMovie(
    @UploadedFiles()
    files: {
      posterUrl?: Express.Multer.File[];
      horizontalPoster?: Express.Multer.File[];
    },
    @Param('id') id: number,
  ) {
    const { posterUrl, horizontalPoster } = files;
    return await this._movieService.addPostersForMovie(
      id,
      posterUrl[0],
      horizontalPoster[0],
    );
  }

  @ApiOperation({ summary: 'Add genres for an movie' })
  @ApiResponse({ status: 200, type: MovieEntity })
  @ApiBody({ type: AddGenresDto })
  @Post('/addGenre/:movieId')
  @HttpCode(200)
  @UseFilters(AllExceptionsFilter)
  async addGenreForMovie(
    @Param('movieId') movieId: number,
    @Body() dto: AddGenresDto,
  ): Promise<MovieEntity> {
    return await this._movieService.addGenreForMovie(movieId, dto);
  }

  @ApiOperation({ summary: 'Delete genre from an movie' })
  @ApiResponse({ status: 200, type: MovieEntity })
  @ApiBody({ type: DeleteGenreDto })
  @Post('/deleteGenre/:movieId')
  @HttpCode(200)
  @UseFilters(AllExceptionsFilter)
  async removeGenreFromMovie(
    @Param('movieId') movieId: number,
    @Body() dto: DeleteGenreDto,
  ): Promise<MovieEntity> {
    return await this._movieService.removeGenreFromMovie(movieId, dto);
  }

  @ApiOperation({ summary: 'Delete movie' })
  @ApiResponse({ status: 200 })
  @Delete(':id')
  @UseFilters(AllExceptionsFilter)
  async removeMovie(@Param('id') id: number): Promise<number> {
    return await this._movieService.removeMovie(id);
  }

  @ApiOperation({ summary: 'Update movie' })
  @ApiBody({ type: UpdateMovieDto })
  @ApiResponse({ status: 200, type: MovieEntity })
  @Put(':id')
  @UseFilters(AllExceptionsFilter)
  async updateMovie(
    @Param('id') id: number,
    @Body() dto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    return await this._movieService.updateMovie(id, dto);
  }
}
