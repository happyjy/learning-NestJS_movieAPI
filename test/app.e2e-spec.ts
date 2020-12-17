import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
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
});
