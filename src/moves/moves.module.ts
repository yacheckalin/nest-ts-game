import { Module } from '@nestjs/common';
import { MovesService } from './moves.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moves } from './moves.entity';
import { Players } from 'src/players/players.entity';
import { GamesService } from 'src/games/games.service';
import { PlayersService } from 'src/players/players.service';
import { Games } from 'src/games/games.entity';

@Module({
  providers: [MovesService, GamesService, PlayersService],
  imports: [TypeOrmModule.forFeature([Moves, Players, Games])],
})
export class MovesModule {}
