/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';

describe('PlayersController', () => {
  let controller: PlayersController;
  let spyService: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [
        {
          provide: PlayersService,
          useFactory: () => ({
            createPlayer: jest.fn(() => {}),
            getPlayerById: jest.fn(() => {}),
            updatePlayerById: jest.fn(() => {}),
            findAllPlayers: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
    spyService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calling getAllPlayers method', () => {
    controller.getAllPlayers();
    expect(spyService.findAllPlayers).toHaveBeenCalled();
  });
  it('calling createPlayer method', () => {
    const dto = new CreatePlayerDto();

    controller.createPlayer(dto);
    expect(spyService.createPlayer).toHaveBeenCalled();
    expect(spyService.createPlayer).toHaveBeenCalledWith(dto);
  });
  it('calling getPlayerInfo method', () => {
    controller.getPlayerInfo(1);
    expect(spyService.getPlayerById).toHaveBeenCalled();
    expect(spyService.getPlayerById).toHaveBeenCalledWith(1);
  });
  it('calling updatePlayer method', () => {
    const dto = new CreatePlayerDto();
    controller.updatePlayer(1, dto);
    expect(spyService.updatePlayerById).toHaveBeenCalled();
    expect(spyService.updatePlayerById).toHaveBeenCalledWith(1, dto);
  });
});
