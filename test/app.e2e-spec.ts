import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  /*  
    # beforeEach
      * 테스트를 할때마다 moduleFixture.createNestApplication()에 의해서 app을 계속 생성한다. => db가 계속 이전과 똑같을 것이다.
    # beforeAll
      * app을 계속 유지한다.
   */
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    /* 
      # pipe(useGlobalPipes)를 추가한 이유
         * request시 get방식으로 /movies/:id를 
         실제 로컬 서버로 요청했을때는 id가 int type이다(main.ts의 pipe의 transform 설정으로)
         * 그러나 
         * 테스트를 위한 앱을 생성할때 pipe 설정을 하지 않았기때문에 id가 string(http get reust시 query 부분은 string이다.)으로 받는다.
          * 즉 테스팅 환경도 실제 구동환경의 설정과 같게 해야한다.  
    */
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()) //app.getHttpServer(): http://localhost:3000/
      .get('/')
      .expect(200) // http status code
      .expect('Welcome to my Movie API'); //Response Code
  });

  describe('/movies', () => {
    // /movies get방식으로 resuest했을때 movie
    it('/GET', () => {
      return request(app.getHttpServer())
        .get('/movies') //
        .expect(200)
        .expect([]); // 첫 테스트 할때 빈 db이기 때문에 이렇게 해야한다.
    });

    // localhost:3000/movies를 post로 요청할때
    // send data를 보내고 201(http status code)를 받는지 확인하는 테스트
    it('/POST', () => {
      return request(app.getHttpServer())
        .post('/movies') //
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(201);
    });

    // 404: NotFound
    // 405: MethodNotAllowed
    it('/POST', () => {
      return request(app.getHttpServer())
        .delete('/movies') //
        .expect(404);
    });
  });

  describe('/movies/:id', () => {
    // # [ ] todo란?
    // it.todo('GET');
    // it.todo('DELETE');
    // it.todo('PATCH');

    it('GET 200', () => {
      return request(app.getHttpServer())
        .get('/movies/1') //
        .expect(200);
    });
    it('GET 404', () => {
      return request(app.getHttpServer())
        .get('/movies/999') //
        .expect(404);
    });
    it.todo('DELETE');
    it.todo('PATCH');
  });
});
