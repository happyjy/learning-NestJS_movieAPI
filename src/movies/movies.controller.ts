import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

// entry point
// express의 router
@Controller('movies')
export class MoviesController {
  @Get()
  getAll(){
    return 'This will return all movies';
  }

  // #STUDY: decorator @get
  // #STUDY: decorator @param
  // #STUDY: decorator id: string
  @Get("/:id")
  getMovie(@Param('id') movieId: string){
    return `This will return one movie ${movieId}`;
  }

  @Get('test')
  test(){
    console.log(`test url: ${arguments[0]}`);
    return 'hi';
  }
  
  @Post()
  create(){
    return 'This will create movie';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string){
    return `This will delete a movie with the id: ${movieId}`;
  }

  // #STUDY: decorator @patch 일부만 update
  // #STUDY: decorator @put 전체 update
  @Patch('/:id')
  patch(@Param('id') movieId: string){
    return `This will patch a movie with the id: ${movieId}`;
  }
}
