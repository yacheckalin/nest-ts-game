/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { MovesService } from '../moves/moves.service';
import { UpdateGameDto } from './dto/update-game.dto';
import { MakeMoveDto } from '../moves/dto/make-move.dto';

describe('GamesController', () => {
  let controller: GamesController;
  let spyService: GamesService;
  let spyMoveService: MovesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GamesController],
      providers: [
        {
          provide: GamesService,
          useFactory: () => ({
            createGame: jest.fn(() => {}),
            updateGame: jest.fn(() => {}),
            getGameInfoById: jest.fn(() => {}),
            getAllGames: jest.fn(() => {}),
            startGame: jest.fn(() => {}),
            stopGame: jest.fn(() => {}),
            addPlayerToGameById: jest.fn(() => {}),
            removePlayerFromGameById: jest.fn(() => {}),
          }),
        },
        {
          provide: MovesService,
          useFactory: () => ({ makeMove: jest.fn(() => {}) }),
        },
      ],
    }).compile();

    controller = module.get<GamesController>(GamesController);
    spyService = module.get<GamesService>(GamesService);
    spyMoveService = module.get<MovesService>(MovesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling getAllGames method', () => {
    controller.getAllGames();
    expect(spyService.getAllGames).toHaveBeenCalled();
  });

  it('calling createGame method', () => {
    const dto = new CreateGameDto();

    controller.createNewGame(dto);
    expect(spyService.createGame).toHaveBeenCalled();
    expect(spyService.createGame).toHaveBeenCalledWith(dto);
  });
  it('calling updateGame method', () => {
    const dto = new UpdateGameDto();

    controller.updateGameById(1, dto);
    expect(spyService.updateGame).toHaveBeenCalled();
    expect(spyService.updateGame).toHaveBeenCalledWith(1, dto);
  });
  it('calling getGameInfo method', () => {
    controller.getGameInfo(1);
    expect(spyService.getGameInfoById).toHaveBeenCalled();
    expect(spyService.getGameInfoById).toHaveBeenCalledWith(1);
  });
  it('calling getAllGames method', () => {
    controller.getAllGames();
    expect(spyService.getAllGames).toHaveBeenCalled();
  });
  it('calling startGame method', () => {
    controller.startGame(1);
    expect(spyService.startGame).toHaveBeenCalled();
    expect(spyService.startGame).toHaveBeenCalledWith(1);
  });
  it('calling stopGame method', () => {
    controller.stopGame(1);
    expect(spyService.stopGame).toHaveBeenCalled();
    expect(spyService.stopGame).toHaveBeenCalledWith(1);
  });
  it('calling addPlayer method', () => {
    controller.addPlayer(1, { playerId: 1 });
    expect(spyService.addPlayerToGameById).toHaveBeenCalled();
    expect(spyService.addPlayerToGameById).toHaveBeenCalledWith(1, 1);
  });
  it('calling removePlayer method', () => {
    controller.removePlayer(1, { playerId: 1 });
    expect(spyService.removePlayerFromGameById).toHaveBeenCalled();
    expect(spyService.removePlayerFromGameById).toHaveBeenCalledWith(1, 1);
  });
  it('calling makeMove method', () => {
    const dto = new MakeMoveDto();
    controller.makeMove(dto);
    expect(spyMoveService.makeMove).toHaveBeenCalled();
    expect(spyMoveService.makeMove).toHaveBeenCalledWith(dto);
  });
});
