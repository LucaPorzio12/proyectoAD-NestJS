import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Movie} from "./interfaces/movie/movie.interface";
import {Model} from "mongoose";
import {MovieDto} from "./dto/movie.dto/movie.dto";

@Injectable()
export class MoviesService {
    constructor(@InjectModel('Movie') private movieModel: Model<Movie>) {
    }

    async create(movieDto: MovieDto): Promise<any> {
        const movie = new this.movieModel(movieDto);
        await movie.save();

    }

    async getMovies(): Promise<Movie[]> {

        return this.movieModel.find();

    }

    async getMovie(id: string): Promise<Movie> {
        return this.movieModel.findById(id);

    }

    async getMovieByName(name: string): Promise<Movie[]> {
        const regex = new RegExp(name, 'i');
        return await this.movieModel.find({title: {$regex: regex}});

    }

    async updateMovie(id: string, movieDto: MovieDto): Promise<Movie> {
        return await this.movieModel.findByIdAndUpdate(
            id,
            {$set: movieDto},
            {new: true});

    }

    async deleteMovie(id: string): Promise<any> {
        return await this.movieModel.findByIdAndDelete(id);
    }

    async getGenres() {
        return this.movieModel.find().distinct('genres');
    }
}

export interface ApiResult {
    status: string;
}
