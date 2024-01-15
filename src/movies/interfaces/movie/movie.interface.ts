export interface Movie {
    _id: string;
    title: string;
    year: number;
    director: string;
    poster: string;
    plot: string;
    genres: string[];
    imdb: Imdb;
}
export interface Imdb {
    rating: number;
    votes: number;
}
