import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { PlayersService } from '../players/players.service';
import { GamesService } from '../games/games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Players } from '../players/players.entity';
import { Games } from '../games/games.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Players, Games])],
  providers: [EventsGateway, PlayersService, GamesService],
  exports: [EventsGateway],
})
export class EventsModule {}
