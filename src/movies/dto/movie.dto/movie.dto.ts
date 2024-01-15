import {Imdb} from "../../interfaces/movie/movie.interface";

export class MovieDto {

    _id: string;
    title: string;
    year: number;
    director: string;
    poster: string;
    plot: string;
    genres: string[];
    imdb: Imdb;
}