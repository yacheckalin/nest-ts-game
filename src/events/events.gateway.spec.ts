/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { EventsGateway } from './events.gateway';
import { PlayersService } from '../players/players.service';
import { CreatePlayerDto } from '../players/dto/create-player.dto';
import { GamesService } from '../games/games.service';

describe('EventsGateway', () => {
  let gateway: EventsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsGateway,
        {
          provide: PlayersService,
          useFactory: () => ({
            getNotBusyPlayer: jest.fn(() => {}),
            createPlayer: jest.fn(() => {}),
          }),
        },
        {
          provide: GamesService,
          useFactory: () => ({
            createGame: jest.fn(() => {}),
            addPlayerToGameById: jest.fn(() => {}),
            start: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    gateway = module.get<EventsGateway>(EventsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
