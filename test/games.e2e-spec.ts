import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Players } from '../src/players/players.entity';
import { Games } from '../src/games/games.entity';

describe('GamesController (e2e)', () => {
  let app: INestApplication;

  const createPlayer = async (data: {
    nickName: string;
    numberInLine: number;
  }): Promise<Players> => {
    let player = {} as Players;
    await request(app.getHttpServer())
      .post('/players')
      .send({ ...data })
      .expect(201)
      .then((res) => {
        player = res.body;
      });

    return Promise.resolve(player);
  };

  const createGame = async (maxPlayer: number): Promise<Games> => {
    let game = {} as Games;
    await request(app.getHttpServer())
      .post('/games')
      .send({ maxPlayer })
      .expect(201)
      .then((res) => {
        game = res.body;
      });

    return Promise.resolve(game);
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('returns an empty array', () => {
    return request(app.getHttpServer()).get('/games').expect(200).expect([]);
  });
  describe('create new game', () => {
    it('creates a new game for 2 players', () => {
      return request(app.getHttpServer())
        .post('/games')
        .send({ maxPlayer: 2 })
        .expect(201)
        .then((res) => {
          const {
            id,
            maxPlayer,
            winner,
            createdAt,
            startedAt,
            stoppedAt,
            endedAt,
          } = res.body;

          expect(id).toBeDefined();
          expect(maxPlayer).toEqual(2);
          expect(winner).toBeNull();
          expect(createdAt).toBeDefined();
          expect(startedAt).toBeNull();
          expect(stoppedAt).toBeNull();
          expect(endedAt).toBeNull();
        });
    });
    it('returns info about the game', () => {
      return request(app.getHttpServer())
        .get('/games/1')
        .expect(200)
        .then((res) => {
          const { id, maxPlayer, createdAt } = res.body;

          expect(id).toEqual(1);
          expect(maxPlayer).toEqual(2);
          expect(createdAt).toBeDefined();
        });
    });
  });

  it('returns updated game info', () => {
    return request(app.getHttpServer())
      .patch('/games/1')
      .send({ maxPlayer: 3 })
      .expect(200)
      .then((res) => {
        const { maxPlayer } = res.body;

        expect(maxPlayer).toEqual(3);
      });
  });

  describe('adds player to existing game', () => {
    let game: Games = null;
    let player: Players = null;

    beforeEach(async () => {
      player = await createPlayer({ nickName: 'TEST_PLAYER', numberInLine: 1 });
      game = await createGame(2);
    });

    it('returns an exception: no game with such ID', () => {
      return request(app.getHttpServer())
        .post(`/games/222/add-player`)
        .send({ playerId: player.id })
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toEqual(`There is no game with such ID`);
        });
    });

    it('returns an exception: no player with such ID', () => {
      return request(app.getHttpServer())
        .post(`/games/${game.id}/add-player`)
        .send({ playerId: 2222 })
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toEqual(`There is no player with such ID`);
        });
    });

    it('returns an exception: the game has all players', async () => {
      const playerOne = await createPlayer({
        nickName: 'PLAYER_1',
        numberInLine: 1,
      });
      const playerTwo = await createPlayer({
        nickName: 'PLAYER_2',
        numberInLine: 2,
      });
      await request(app.getHttpServer())
        .post(`/games/${game.id}/add-player`)
        .send({ playerId: playerOne.id })
        .expect(201);
      await request(app.getHttpServer())
        .post(`/games/${game.id}/add-player`)
        .send({ playerId: playerTwo.id })
        .expect(201);

      return request(app.getHttpServer())
        .post(`/games/${game.id}/add-player`)
        .send({ playerId: playerTwo.id })
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toEqual(`This game has all players!`);
        });
    });

    // it('return an exception: the player has already in a pool', async () => {
    //   await request(app.getHttpServer())
    //     .post(`/games/${game.id}/add-player`)
    //     .send({ playerId: player.id })
    //     .expect(201);

    //   return request(app.getHttpServer())
    //     .post(`/games/${game.id}/add-player`)
    //     .send({ playerId: player.id })
    //     .expect(400)
    //     .then(({ body: { message } }) => {
    //       expect(message).toEqual(`This player has already in a game pool ...`);
    //     });
    // });
  });

  describe('remove player from game logic', () => {
    let player: Players = null;
    let game: Games = null;

    beforeEach(async () => {
      player = await createPlayer({ nickName: 'NEW_PLAYER', numberInLine: 1 });
      game = await createGame(2);
      await request(app.getHttpServer())
        .post(`/games/${game.id}/add-player`)
        .send({ playerId: player.id })
        .expect(201);
    });

    it('returns an exception: no game with such ID', () => {
      return request(app.getHttpServer())
        .post(`/games/1111/remove-player`)
        .expect(404);
    });

    it('returns an exception: there is no player with such ID', () => {
      return request(app.getHttpServer())
        .post(`/games/${game.id}/remove-player`)
        .send({ playerId: 333 })
        .expect(404);
    });
    it('returns an updated game', () => {
      return request(app.getHttpServer())
        .post(`/games/${game.id}/remove-player`)
        .send({ playerId: player.id })
        .expect(201)
        .then((res) => {
          const { id, players } = res.body;

          expect(id).toBeDefined();
          expect(players.length).toEqual(0);
        });
    });
  });

  describe('starts game exceptions logic', () => {
    it('returns NotFoundException when starting game with non-existing ID', () => {
      return request(app.getHttpServer())
        .post('/games/222/start')
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toEqual('There is no game with such ID');
        });
    });

    it('returns BadRequestException when game does not have enough players', () => {
      return request(app.getHttpServer())
        .post('/games/1/start')
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toEqual(
            `This game doesn't have enough players to start!`,
          );
        });
    });

    it('returns exception when game has already overed', async () => {
      const playerOne = await createPlayer({
        nickName: 'TEST_1',
        numberInLine: 1,
      });
      const playerTwo = await createPlayer({
        nickName: 'TEST_2',
        numberInLine: 2,
      });

      await request(app.getHttpServer())
        .post('/games/1/add-player')
        .send({ playerId: playerOne.id })
        .expect(201);
      await request(app.getHttpServer())
        .post('/games/1/add-player')
        .send({ playerId: playerTwo.id })
        .expect(201);

      await request(app.getHttpServer())
        .patch('/games/1')
        .send({ endedAt: new Date(), winner: playerOne.id })
        .expect(200);

      return request(app.getHttpServer())
        .post('/games/1/start')
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toEqual(`The game has already overed!`);
        });
    });

    it('returns exceptions when the game has already been started', async () => {
      const playerOne = await createPlayer({
        nickName: 'TEST_1',
        numberInLine: 1,
      });
      const playerTwo = await createPlayer({
        nickName: 'TEST_2',
        numberInLine: 2,
      });
      const newGame = await createGame(2);

      await request(app.getHttpServer())
        .patch(`/games/${newGame.id}`)
        .send({ startedAt: new Date(), endedAt: null, maxPlayer: 2 })
        .expect(200);

      await request(app.getHttpServer())
        .post(`/games/${newGame.id}/add-player`)
        .send({ playerId: playerOne.id })
        .expect(201);
      await request(app.getHttpServer())
        .post(`/games/${newGame.id}/add-player`)
        .send({ playerId: playerTwo.id })
        .expect(201);

      return request(app.getHttpServer())
        .post(`/games/${newGame.id}/start`)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toEqual(`The game has already been started!`);
        });
    });

    it('returns started game ', async () => {
      const playerOne = await createPlayer({
        nickName: 'TEST_1',
        numberInLine: 1,
      });
      const playerTwo = await createPlayer({
        nickName: 'TEST_2',
        numberInLine: 2,
      });
      const newGame = await createGame(2);
      await request(app.getHttpServer())
        .post(`/games/${newGame.id}/add-player`)
        .send({ playerId: playerOne.id })
        .expect(201);
      await request(app.getHttpServer())
        .post(`/games/${newGame.id}/add-player`)
        .send({ playerId: playerTwo.id })
        .expect(201);

      return request(app.getHttpServer())
        .post(`/games/${newGame.id}/start`)
        .expect(201)
        .then((res) => {
          const { id, startedAt, endedAt, stoppedAt, winner } = res.body;

          expect(id).toEqual(newGame.id);
          expect(startedAt).toBeDefined();
          expect(endedAt).toBeNull();
          expect(stoppedAt).toBeNull();
          expect(winner).toBeNull();
        });
    });
  });
  describe('stop game exceptions logic', () => {
    let gameId = null;
    const players = [] as Players[];
    beforeEach(async () => {
      await request(app.getHttpServer())
        .post('/games')
        .send({ maxPlayer: 2 })
        .then((res) => {
          gameId = res.body.id;
        });

      const playerOne = await createPlayer({
        nickName: 'TEST_1',
        numberInLine: 1,
      });
      const playerTwo = await createPlayer({
        nickName: 'TEST_2',
        numberInLine: 2,
      });
      players.push(playerOne, playerTwo);

      await request(app.getHttpServer())
        .post(`/games/${gameId}/add-player`)
        .send({ playerId: playerOne.id })
        .expect(201);
      await request(app.getHttpServer())
        .post(`/games/${gameId}/add-player`)
        .send({ playerId: playerTwo.id })
        .expect(201);
    });
    it('returns an exception there is no such game', () => {
      return request(app.getHttpServer())
        .post('/games/111/stop')
        .expect(404)
        .then(({ body: { message } }) => {
          expect(message).toEqual(`There is no game with such ID`);
        });
    });

    it('returns an exception: game did not start yet', () => {
      return request(app.getHttpServer())
        .post(`/games/${gameId}/stop`)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toEqual(`Game did not start yet!`);
        });
    });

    it('returns an excpetion: game has already finished', async () => {
      await request(app.getHttpServer()).patch(`/games/${gameId}`).send({
        startedAt: new Date(),
        endedAt: new Date(),
        winner: players[0].id,
      });

      return request(app.getHttpServer())
        .post(`/games/${gameId}/stop`)
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toEqual(`Game has already finished!`);
        });
    });

    it('stops already started and not finished game', async () => {
      await request(app.getHttpServer())
        .patch(`/games/${gameId}`)
        .send({ startedAt: new Date() });
      return request(app.getHttpServer())
        .post(`/games/${gameId}/stop`)
        .expect(201)
        .then(({ body: { id, winner, startedAt, endedAt, stoppedAt } }) => {
          expect(id).toBeDefined();
          expect(winner).toBeNull();
          expect(startedAt).toBeDefined();
          expect(stoppedAt).toBeDefined();
          expect(endedAt).toBeNull();
        });
    });
  });
  describe('make a move logic', () => {
    let game: Games = null;
    const players: Players[] = [];

    beforeEach(async () => {
      game = await createGame(2);
      const player1 = await createPlayer({
        nickName: 'TEST_1',
        numberInLine: 1,
      });
      const player2 = await createPlayer({
        nickName: 'TEST_2',
        numberInLine: 2,
      });
      players.push(player1);
      players.push(player2);
    });

    it('returns an exception: catch game error ...', () => {
      return request(app.getHttpServer())
        .post(`/games/make-move`)
        .send({ player: players[0].id, game: game.id })
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toEqual(`Catch game error ...`);
        });
    });

    it('returns an exception: player does not have permission to make a move', async () => {
      const player = (await createPlayer({
        nickName: 'NEW_PLAYER',
        numberInLine: 1,
      })) as Players;

      await request(app.getHttpServer()).patch(`/games/${game.id}`).send({
        startedAt: new Date(),
        endedAt: null,
        stoppedAt: null,
        winner: null,
      });

      return request(app.getHttpServer())
        .post(`/games/make-move`)
        .send({ player: player.id, game: game.id })
        .expect(400)
        .then(({ body: { message } }) => {
          expect(message).toEqual(
            `Player does not have permission to make a move in this game!`,
          );
        });
    });
  });
});
