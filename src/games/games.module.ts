import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Games } from './games.entity';
import { Players } from '../players/players.entity';
import { MovesService } from '../moves/moves.service';
import { Moves } from '../moves/moves.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Games, Players, Moves])],
  controllers: [GamesController],
  providers: [GamesService, MovesService],
})
export class GamesModule {}
