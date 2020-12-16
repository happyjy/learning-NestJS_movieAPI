import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  create(moviewData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...moviewData,
    });
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);
    // console.log(this.movies);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  getAll(): Movie[] {
    return this.movies;
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }

  deleteOne(id: number) {
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }
}
