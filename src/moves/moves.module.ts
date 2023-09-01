import { Module } from '@nestjs/common';
import { MovesService } from './moves.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moves } from './moves.entity';
import { Players } from '../players/players.entity';
import { GamesService } from '../games/games.service';
import { PlayersService } from '../players/players.service';
import { Games } from '../games/games.entity';

@Module({
  providers: [MovesService, GamesService, PlayersService],
  imports: [TypeOrmModule.forFeature([Moves, Players, Games])],
})
export class MovesModule {}
