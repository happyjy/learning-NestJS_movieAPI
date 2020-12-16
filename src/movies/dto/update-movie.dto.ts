import { IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

// mapped-types는 타입을 변환시키고 사용할 수 있게 하는 패키지.
// partialType을 사용함으로 UpdateMovieDto는 "CreateMovieDto"의 요소가 모두 optional이 된다.
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

// export class UpdateMovieDto {
//   // #STUDY: nest의 partialType 확장으로 ts의 ?기능 optional parameters 기능을 대신한다.
//   @IsString()
//   readonly title: string;
//   @IsNumber()
//   readonly year: number;
//   @IsString({ each: true })
//   readonly genres: string[];
// }
