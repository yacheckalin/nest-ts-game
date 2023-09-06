import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { PlayersService } from '../players/players.service';
import { GamesService } from '../games/games.service';
import { MovesService } from '../moves/moves.service';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const crypto = require('crypto');

@WebSocketGateway({ cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly playerService: PlayersService,
    private readonly gamesService: GamesService,
    private readonly movesService: MovesService,
  ) {}

  @SubscribeMessage('init-player')
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
        client.emit('broadcast', { player });
      } else {
        player = payload.player;
      }
    } catch (e) {
      client.emit('error', { message: e.message });
    }
  }

  @SubscribeMessage('init-game')
  async handleInitGame(client: any, payload: any) {
    try {
      let game = null;
      let player = null;
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
            payload.player.id,
          );

          // get updated player info
          player = await this.playerService.getPlayerById(payload.player.id);
          client.emit('broadcast', { game, player });
        }
      }
    } catch (e) {
      client.emit('error', { message: e.message });
    }
  }

  @SubscribeMessage('refresh')
  async handleRefreshData(client: any, payload: any) {
    try {
      const game = payload?.game
        ? await this.gamesService.getGameInfoById(payload.game?.id)
        : null;

      const player = payload?.player
        ? await this.playerService.getPlayerById(payload.player?.id)
        : null;

      const moves =
        game && payload?.move
          ? await this.movesService.getAllByGameId(+game.id)
          : null;
      client.emit('broadcast', { game, player, move: moves });
    } catch (e) {
      client.emit('error', { message: e.message });
    }
  }

  @SubscribeMessage('make-move')
  async handleMakeMove(client: any, payload: any) {
    try {
      // make first move
      const move =
        (await this.movesService.makeMove({
          game: payload.game?.id,
          player: payload.player?.id,
          value: payload?.value || null,
        })) || null;

      client.emit('broadcast', {
        move,
        game: payload.game,
        player: payload.player,
      });
    } catch (e) {
      client.emit('error', { message: e.message });
    }
  }
}
