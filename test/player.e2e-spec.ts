import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

import { PlayersStatus } from '../src/players/players.entity';

describe('PlayersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('returns an empty array ', () => {
    return request(app.getHttpServer()).get('/players').expect(200).expect([]);
  });

  describe('create new player', () => {
    it('create a new player with default status and numberInLine', () => {
      return request(app.getHttpServer())
        .post('/players')
        .send({ nickName: 'Test_1' })
        .expect(201)
        .then((res) => {
          const { id, status, numberInLine, nickName } = res.body;
          expect(id).toBeDefined();
          expect(status).toEqual('pending');
          expect(numberInLine).toEqual(1);
          expect(nickName).toEqual('Test_1');
        });
    });
  });

  it('returns player info', () => {
    return request(app.getHttpServer())
      .get('/players/1')
      .expect(200)
      .then((res) => {
        const { id, nickName, status, numberInLine, game } = res.body;
        expect(id).toBeDefined();
        expect(nickName).toEqual('Test_1');
        expect(status).toEqual('pending');
        expect(numberInLine).toEqual(1);
        expect(game).toBeNull();
      });
  });
  describe('update existing player', () => {
    it('returns updated nickName', () => {
      return request(app.getHttpServer())
        .patch('/players/1')
        .send({ nickName: 'NEW_TEST_NAME' })
        .expect(200)
        .then((res) => {
          const { id, nickName } = res.body;

          expect(id).toEqual(1);
          expect(nickName).toEqual('NEW_TEST_NAME');
        });
    });
    it('returns updated status', () => {
      return request(app.getHttpServer())
        .patch('/players/1')
        .send({ status: PlayersStatus.PLAYING })
        .expect(200)
        .then((res) => {
          const { id, status } = res.body;

          expect(id).toEqual(1);
          expect(status).toEqual(PlayersStatus.PLAYING);
        });
    });
    it('returns an exception when changing status', () => {
      return request(app.getHttpServer())
        .patch('/players/1')
        .send({ status: 'something' })
        .expect(500);
    });
    it('returns updated numberInLines', () => {
      return request(app.getHttpServer())
        .patch('/players/1')
        .send({ numberInLine: 2 })
        .expect(200)
        .then((res) => {
          const { id, numberInLine } = res.body;

          expect(id).toEqual(1);
          expect(numberInLine).toEqual(2);
        });
    });
  });
});
