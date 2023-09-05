import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { PlayersService } from '../players/players.service';
import { GamesService } from '../games/games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Players } from '../players/players.entity';
import { Games } from '../games/games.entity';
import { Moves } from '../moves/moves.entity';
import { MovesService } from '../moves/moves.service';

@Module({
  imports: [TypeOrmModule.forFeature([Players, Games, Moves])],
  providers: [EventsGateway, PlayersService, GamesService, MovesService],
  exports: [EventsGateway],
})
export class EventsModule {}
