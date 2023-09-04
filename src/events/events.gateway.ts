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

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly playerService: PlayersService,
    private readonly gamesService: GamesService,
  ) {}

  @SubscribeMessage('init-shake')
  async handleShake(client: any, payload: any) {
    try {
      let player = null;
      if (!payload?.player) {
        // get first not busy or create new player
        const notBusyPlayer = await this.playerService.getNotBusyPlayer();
        if (!notBusyPlayer) {
          player = await this.playerService.createPlayer({
            nickName: `PLAYER_${crypto.randomUUID()}`,
          });
        }
        player = notBusyPlayer || player;
        client.emit('init-player', { player });
      } else {
        player = payload.player;
      }
      let game = null;

      // get first available game
      if (!payload?.game) {
        const firstAvailableGame = await this.gamesService.getFirstAvailable();

        if (!firstAvailableGame) {
          client.emit('error', {
            message: 'There is no available game yet, please wait ...',
          });
        } else {
          // add player to the first available game
          game = await this.gamesService.addPlayerToGameById(
            firstAvailableGame?.id,
            player.id,
          );

          client.emit('init-game', { game, player });
        }
      }
    } catch (e) {
      client.emit('error', e.message);
    }
  }
}
