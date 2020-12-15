import { Controller, Get } from '@nestjs/common';

// http request를 받는 역할을 한다.
// localhost:3000으로 접속하면 아래 "Welcom to my Movie API" string이 브라우저에 렌더링 된다. 
@Controller('')
export class AppController {
  @Get()
  home(){
    return 'Welcome to my Movie API' ;
  }
}
