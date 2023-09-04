import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PlayersService } from '../players/players.service';
import { GamesService } from '../games/games.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly playerService: PlayersService,
    private readonly gamesService: GamesService,
  ) {}

  @SubscribeMessage('init')
  async handleShake(client: any, payload: any) {
    try {
      // get first not busy or create new player
      const notBusyPlayer = await this.playerService.getNotBusyPlayer();
      let player = null;
      if (!notBusyPlayer) {
        player = await this.playerService.createPlayer({
          nickName: `PLAYER_${crypto.randomUUID()}`,
        });
      }
      player = notBusyPlayer || player;
      client.emit('init-player', { player });

      // get first available game
      let game = null;
      const firstAvailableGame = await this.gamesService.getFirstAvailable();

      // add player to the first available game
      game = await this.gamesService.addPlayerToGameById(
        firstAvailableGame?.id,
        player.id,
      );

      client.emit('init-game', { game, player });
    } catch (e) {
      client.emit('error', e.message);
    }
  }
}
