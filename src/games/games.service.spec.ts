/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

class GamesServiceMock {
  createGame(data: CreateGameDto) {
    return {};
  }

  updateGame(id: number, data: Partial<CreateGameDto>) {
    return {};
  }

  getGameInfoById(id: number) {
    return {};
  }

  getAllGames() {
    return {};
  }
  startGame(id: number) {
    return {};
  }
  stopGame(id: number) {
    return {};
  }
  addPlayerToGameById(id: number, playerId: number) {
    return {};
  }
  removePlayerFromGameById(id: number, playerId: number) {}
  getFirstAvailable() {}
}

describe('GamesService', () => {
  let service: GamesService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [{ provide: GamesService, useClass: GamesServiceMock }],
    }).compile();

    service = moduleRef.get<GamesService>(GamesService);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call createGame method with expected param', async () => {
    const createGameSpy = jest.spyOn(service, 'createGame');
    const dto = new CreateGameDto();
    service.createGame(dto);
    expect(createGameSpy).toHaveBeenCalledWith(dto);
  });
  it('should call updateGame method with expected param', async () => {
    const updateGameSpy = jest.spyOn(service, 'updateGame');
    const dto = new UpdateGameDto();
    service.updateGame(1, dto);
    expect(updateGameSpy).toHaveBeenCalledWith(1, dto);
  });

  it('should call getGameInfoById method with expected param', async () => {
    const getGameInfoSpy = jest.spyOn(service, 'getGameInfoById');
    service.getGameInfoById(1);
    expect(getGameInfoSpy).toHaveBeenCalledWith(1);
  });
  it('should call getAllGames method ', async () => {
    const getGamesSpy = jest.spyOn(service, 'getAllGames');
    service.getAllGames();
    expect(getGamesSpy).toHaveBeenCalled();
  });
  it('should call getFirstAvailable method', () => {
    const getFirstAvailableSpy = jest.spyOn(service, 'getFirstAvailable');
    service.getFirstAvailable();
    expect(getFirstAvailableSpy).toHaveBeenCalled();
  });

  it('should call startGame method with expected param', async () => {
    const startGameSpy = jest.spyOn(service, 'startGame');
    service.startGame(1);
    expect(startGameSpy).toHaveBeenCalledWith(1);
  });
  it('should call stopGame method with expected param', async () => {
    const stopGameSpy = jest.spyOn(service, 'stopGame');
    service.stopGame(1);
    expect(stopGameSpy).toHaveBeenCalledWith(1);
  });
  it('should call addPlayerToGameById method with expected param', async () => {
    const addPlayerToGameByIdSpy = jest.spyOn(service, 'addPlayerToGameById');
    service.addPlayerToGameById(1, 1);
    expect(addPlayerToGameByIdSpy).toHaveBeenCalledWith(1, 1);
  });
  it('should call removePlayerFromGameById method with expected param', async () => {
    const removePlayerFromGameByIdSpy = jest.spyOn(
      service,
      'removePlayerFromGameById',
    );
    service.removePlayerFromGameById(1, 1);
    expect(removePlayerFromGameByIdSpy).toHaveBeenCalledWith(1, 1);
  });
});
