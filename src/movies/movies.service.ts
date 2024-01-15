import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Movie} from "./interfaces/movie/movie.interface";
import {Model} from "mongoose";
import {MovieDto} from "./dto/movie.dto/movie.dto";

@Injectable()
export class MoviesService {
    constructor(@InjectModel('Movie') private movieModel: Model<Movie>) {
    }

    async create(movieDto: MovieDto): Promise<ApiResult> {
        try {
            const movie = new this.movieModel(movieDto);
            await movie.save();
            return {
                status: 'Movie Inserted'
            }
        } catch (e) {
            return {
                status: e
            }
        }
    }

    async getMovies(): Promise<Movie[] | ApiResult> {
        try {
            return this.movieModel.find();
        } catch (e) {
            return {
                status: e
            }
        }
    }

    async getMovie(id: string): Promise<Movie | ApiResult> {
        try {
            return this.movieModel.findById(id);
        } catch (e) {
            return {
                status: e
            }
        }
    }

    async getMovieByName(name: string): Promise<Movie[] | ApiResult> {
        try {
            const regex = new RegExp(name, 'i');
            return this.movieModel.find({title: {$regex: regex}});
        } catch (e) {
            return {
                status: e
            }
        }
    }

    async updateMovie(id: string, movieDto: MovieDto): Promise<ApiResult> {
        try {
            this.movieModel.findByIdAndUpdate(
                id,
                {$set: movieDto},
                {new: true});
            return {
                status: 'Movie Updated'
            }
        } catch (e) {
            return {
                status: e
            }
        }
    }

    async deleteMovie(id: string): Promise<ApiResult> {
        try {
            this.movieModel.findByIdAndDelete(id);
            return {
                status: 'Movie Deleted'
            }
        } catch (e) {
            return {
                status: e
            }
        }
    }
}

export interface ApiResult {
    status: string;
}
