import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {MoviesService} from "./movies.service";
import {MovieDto} from "./dto/movie.dto/movie.dto";

@Controller('api/movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {
    }

    @Post('')
    async create(@Body() movieDto: MovieDto) {
        return this.moviesService.create(movieDto);
    }

    @Get('')
    async getMovies() {
        return this.moviesService.getMovies();
    }

    @Get('movie/:id')
    async getMovie(@Param('id') id: string) {
        return this.moviesService.getMovie(id);
    }

    @Get('byName/:name')
    async getMovieByName(@Param('name') name: string) {
        return this.moviesService.getMovieByName(name);
    }

    @Patch('/:id')
    async updateMovie(
        @Param('id') id: string,
        @Body() movieDto: MovieDto
    ) {
        return this.moviesService.updateMovie(id, movieDto);
    }

    @Delete('/:id')
    async deleteMovie(@Param('id') id: string) {
        return this.moviesService.deleteMovie(id);
    }
}
