import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

// entry point
// express의 router
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService){}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
    // return 'This will return all movies ';
  }

  // #STUDY: decorator @Query
  //          ㄴ 다음 url에서 year=2000을 받는다. (url?year=2000)
  @Patch('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }

  // #STUDY: decorator @get
  // #STUDY: decorator @param
  //          ㄴ url로 보내는 param을 받는다.
  // #STUDY: decorator id: string
  @Get(":id")
  getOne(@Param('id') movieId: string): Movie {
    return this.moviesService.getOne(movieId);
  }
 
  // #STUDY: decorator @Body 
  //          ㄴpost요청으로 Body로 보낸 data 받는 방법 
  @Post()
  create(@Body() movieData){
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id') movieId: string){
    return this.moviesService.deleteOne(movieId); 
  }

  // #STUDY: decorator @patch 일부만 update
  // #STUDY: decorator @put 전체 update
  // #STUDY: request, response가 json type으로 되어 있다.
  //          (express.js에서 body를 json으로 리턴하거나 하려면 설정해야 했음.)
  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData){
    return this.moviesService.update(movieId, updateData);
  }

  @Get('test')
  test(){
    console.log(`test url: ${arguments[0]}`);
    return 'hi';
  }
}
