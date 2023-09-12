import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

import { Players, PlayersStatus } from '../src/players/players.entity';

describe('PlayersController (e2e)', () => {
  let app: INestApplication;

  const createPlayer = async () => {
    let player: Players | null = null;
    player = await request(app.getHttpServer())
      .post('/players')
      .send({ nickName: 'Test_1' })
      .expect(201)
      .then((res) => (player = res.body));

    return Promise.resolve(player);
  };

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
    let player = {} as Players;
    beforeEach(async () => {
      player = await createPlayer();
    });
    it('returns updated nickName', () => {
      return request(app.getHttpServer())
        .patch(`/players/${player.id}`)
        .send({ nickName: 'NEW_TEST_NAME' })
        .expect(200)
        .then((res) => {
          const { id, nickName, numberInLine } = res.body;

          expect(id).toEqual(player.id);
          expect(nickName).toEqual('NEW_TEST_NAME');
          expect(numberInLine).toEqual(player.numberInLine);
        });
    });
    it('returns updated status', () => {
      return request(app.getHttpServer())
        .patch(`/players/${player.id}`)
        .send({ status: PlayersStatus.PLAYING })
        .expect(200)
        .then((res) => {
          const { id, status } = res.body;

          expect(id).toEqual(player.id);
          expect(status).toEqual(PlayersStatus.PLAYING);
        });
    });

    it('returns updated numberInLines', () => {
      return request(app.getHttpServer())
        .patch(`/players/${player.id}`)
        .send({ numberInLine: 2 })
        .expect(200)
        .then((res) => {
          const { id, numberInLine } = res.body;

          expect(id).toEqual(player.id);
          expect(numberInLine).toEqual(2);
        });
    });
  });
});
