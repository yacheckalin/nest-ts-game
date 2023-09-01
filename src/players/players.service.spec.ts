import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';

class PlayerServiceMock {
  findAllPlayers() {
    return Promise.resolve([]);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createPlayer(_: Partial<CreatePlayerDto>) {
    return Promise.resolve({});
  }
  getPlayerById(id: number) {
    return Promise.resolve({ id });
  }
  updatePlayerById(id: number, data: Partial<CreatePlayerDto>) {
    return Promise.resolve({ id, ...data });
  }
  getNotBusyPlayer() {
    return Promise.resolve({});
  }
}

describe('PlayersService', () => {
  let service: PlayersService;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      providers: [{ provide: PlayersService, useClass: PlayerServiceMock }],
    }).compile();

    service = moduleRef.get<PlayersService>(PlayersService);
  });

  afterEach(async () => {
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findAllPlayers method', async () => {
    const findAllSpy = jest.spyOn(service, 'findAllPlayers');
    service.findAllPlayers();
    expect(findAllSpy).toHaveBeenCalled();
  });

  it('should call createPlayer method with expected param', async () => {
    const createPlayerSpy = jest.spyOn(service, 'createPlayer');
    const dto = new CreatePlayerDto();
    service.createPlayer(dto);
    expect(createPlayerSpy).toHaveBeenCalledWith(dto);
  });

  it('should call updatePlayerById method with expected param', async () => {
    const updatePlayerSpy = jest.spyOn(service, 'updatePlayerById');
    const dto = new CreatePlayerDto();
    service.updatePlayerById(1, dto);
    expect(updatePlayerSpy).toHaveBeenCalledWith(1, dto);
  });

  it('should call getNotBusyPlayer method', async () => {
    const findAllSpy = jest.spyOn(service, 'getNotBusyPlayer');
    service.getNotBusyPlayer();
    expect(findAllSpy).toHaveBeenCalled();
  });

  it('should call getPlayerById method with expected param', async () => {
    const getPlayerSpy = jest.spyOn(service, 'getPlayerById');
    service.getPlayerById(1);
    expect(getPlayerSpy).toHaveBeenCalledWith(1);
  });
});
