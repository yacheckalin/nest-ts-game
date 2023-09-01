import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Games } from './games.entity';
import { Players } from 'src/players/players.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Games, Players])],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
