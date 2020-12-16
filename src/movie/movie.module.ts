import { Module } from '@nestjs/common';
import { MoviesController } from 'src/movies/movies.controller';
import { MoviesService } from 'src/movies/movies.service';

// # app.module.ts에서 이 파일을 import하게 만들어 모듈로 분리 했다.
// # providers가 contorllers에 있는 모든 것을 immport해서 타입을 추가하는 것만으로 잘 작동하는것.
// (=NestJS가 MoviesService를 import하고 Controller에 Inject 한다.)
// # MoviesService에는 Injectable이라는 decorator가 있다.
@Module({
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MovieModule {}

// 언제 app.module, Controller, Provider를 만들면 될가?
