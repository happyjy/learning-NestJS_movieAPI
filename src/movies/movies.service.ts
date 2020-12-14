import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[]{
    return this.movies;
  }

  getOne(id: string): Movie {
    const movie = this.movies.find(movie => movie.id === +id);
    console.log(this.movies);
    if(!movie){
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
    return movie;
  }

  deleteOne(id: string) {
    this.movies = this.movies.filter(movie => movie.id !== +id);
  }

  create(moviewData){
    console.log("creatreeeeee")
    this.movies.push({
      id: this.movies.length + 1,
      ...moviewData
    })
  }
  update(id: string, updateData){
    console.log("### update")
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
