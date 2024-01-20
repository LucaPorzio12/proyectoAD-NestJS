import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {MoviesService} from "./movies.service";
import {MovieDto} from "./dto/movie.dto/movie.dto";

@Controller('api/movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {
    }

    @Post('')
    async create(@Body() movieDto: MovieDto) {
        try {
            await this.moviesService.create(movieDto);
            return {
                status: 'Movie Inserted'
            }
        } catch (e) {
            return {
                status: e.message
            }
        }
    }

    @Get('')
    async getMovies() {
        try {
            const movies = await this.moviesService.getMovies();
            return movies
        } catch (e) {
            return {
                status: e.message
            }
        }
    }

    @Get('genres')
    async getGenres() {
        try {
            const genres = await this.moviesService.getGenres();
            return genres
        } catch (e) {
            return {
                status: e.message
            }
        }
    }

    @Get('movie/:id')
    async getMovie(@Param('id') id: string) {
        try {
            const movie = await this.moviesService.getMovie(id);
            if (movie != null) return movie
            else return {
                status: 'La película no encontrada'
            }
        } catch (e) {
            return {
                status: e.message
            }
        }
    }

    @Get('byName/:name')
    async getMovieByName(@Param('name') name: string) {

        try {
            const movies = await this.moviesService.getMovieByName(name);
            if (movies != null) return movies
            else return {
                status: 'La película no existe'
            }
        } catch (e) {
            return {
                status: e.message
            }
        }
    }

    @Patch('/:id')
    async updateMovie(
        @Param('id') id: string,
        @Body() movieDto: MovieDto
    ) {
        try {
            const movie = await this.moviesService.updateMovie(id, movieDto);
            if (movie != null) return {
                status: 'Movie updated'
            }
            else return {
                status: 'La película no está en la base de datos'
            }
        } catch (e) {
            return {
                status: e.message
            }
        }
    }

    @Delete('/:id')
    async deleteMovie(@Param('id') id: string) {
        try {
            const movie = await this.moviesService.deleteMovie(id);
            if (movie != null) return {
                status: 'Movie deleted'
            }
            else return {
                status: 'La película no está en la base de datos'
            }
        } catch (e) {
            return {
                status: e.message
            }
        }
    }
}
